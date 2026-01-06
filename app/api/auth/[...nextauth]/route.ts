import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email?.toLowerCase().trim();
                const password = credentials?.password?.trim();

                // 1. Check for hardcoded Demo Admin (Before DB connection to allow access even if DB is down)
                if (email === "admin@example.com" && password === "AdmiN_7788!@#") {
                    return {
                        id: "demo-admin",
                        name: "Demo Admin",
                        email: "admin@example.com",
                        role: "admin",
                    };
                }

                try {
                    await connectDB();
                } catch (error) {
                    console.error("Database connection failed:", error);
                    return null;
                }

                // 2. Check Database
                if (!email || !password) {
                    return null;
                }

                const user = await User.findOne({ email }).select('+password');

                if (!user) {
                    return null;
                }

                const isMatch = await bcrypt.compare(password, user.password as string);

                if (!isMatch) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
