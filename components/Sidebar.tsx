'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, Settings, LogOut, PlusCircle, UserPlus, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: '/products',
        icon: Package,
    },
    {
        title: 'Add Product',
        href: '/products/new',
        icon: PlusCircle,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // If not authenticated, don't show sidebar (or show skeleton, but typically layout handles protection)
    // However, layout renders sidebar always. We can hide it if no session? 
    // For better UX during loading, we might show a skeleton, but here we just return null or generic.
    // Actually, better to hide implementation detail.

    if (!session || pathname === '/login') return null;

    return (
        <div className="hidden border-r border-gray-200 bg-white/50 backdrop-blur-xl lg:block w-64 h-screen fixed left-0 top-0 z-30">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b border-gray-100 px-6">
                    <Link className="flex items-center gap-2 font-bold text-xl text-primary-600" href="/">
                        <Package className="h-6 w-6" />
                        <span>Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary-600 my-1",
                                        isActive
                                            ? "bg-primary-50 text-primary-600 shadow-sm"
                                            : "text-gray-500 hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <div className="mt-4 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Admin
                        </div>
                        <Link
                            href="/admin/onboard"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary-600 my-1",
                                pathname === '/admin/onboard'
                                    ? "bg-primary-50 text-primary-600 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            <UserPlus className="h-4 w-4" />
                            Onboard Admin
                        </Link>

                    </nav>
                </div>
                <div className="mt-auto p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between gap-2 px-2 py-2 text-sm font-medium text-gray-500 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
                                {session.user?.name?.[0] || 'A'}
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-gray-900 truncate">{session.user?.name}</span>
                                <span className="text-xs text-gray-400 truncate">{session.user?.email}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
