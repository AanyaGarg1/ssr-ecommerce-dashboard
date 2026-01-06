'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Determine if we should show the sidebar and apply padding
    const showSidebar = session && pathname !== '/login';

    return (
        <div className="flex min-h-screen">
            {showSidebar && <Sidebar />}
            <main className={cn(
                "flex-1",
                showSidebar ? "lg:pl-64" : ""
            )}>
                <div className="container mx-auto p-4 md:p-8 pt-6 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
