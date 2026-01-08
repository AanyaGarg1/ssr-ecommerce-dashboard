'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, Settings, LogOut, PlusCircle, UserPlus, Users, BarChart3, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const sidebarItems = [
    {
        title: 'Overview',
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
    {
        title: 'Reports',
        href: '#',
        icon: BarChart3,
        disabled: true,
    }
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    if (!session || pathname === '/login') return null;

    return (
        <div className="hidden border-r border-slate-200/60 bg-white/70 backdrop-blur-xl lg:block w-72 h-screen fixed left-0 top-0 z-40 transition-all duration-300">
            <div className="flex h-full flex-col">
                <div className="flex h-20 items-center px-8 border-b border-slate-100/80">
                    <Link className="flex items-center gap-3 group" href="/">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-tight text-slate-900">Aura</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-500 -mt-1">Dashboard</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                    <div className="space-y-1">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Main Menu
                        </p>
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.disabled ? '#' : item.href}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 relative",
                                        isActive
                                            ? "text-indigo-600 bg-indigo-50/50"
                                            : item.disabled ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5 transition-colors duration-200",
                                        isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                                    )} />
                                    {item.title}

                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute left-0 w-1 h-6 rounded-r-full bg-indigo-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 space-y-1">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Administration
                        </p>
                        <Link
                            href="/admin/onboard"
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 relative",
                                pathname === '/admin/onboard'
                                    ? "text-indigo-600 bg-indigo-50/50"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <UserPlus className={cn(
                                "h-5 w-5 transition-colors duration-200",
                                pathname === '/admin/onboard' ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                            )} />
                            Onboard Team
                        </Link>
                    </div>
                </div>

                <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-2 rounded-2xl bg-white shadow-sm border border-slate-100">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden border-2 border-white">
                                {session.user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{session.user?.name}</p>
                            <p className="text-[11px] text-slate-400 truncate font-medium">{session.user?.email}</p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

