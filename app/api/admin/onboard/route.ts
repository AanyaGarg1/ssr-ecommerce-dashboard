import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    // Only admins can create new admins
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const { name, email, password } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });

        return NextResponse.json({ success: true, data: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
    } catch (error: any) {
        console.error("Onboarding error:", error);
        return NextResponse.json({ success: false, error: 'Failed to onboard admin: ' + (error.message || 'Unknown error') }, { status: 500 });
    }
}
