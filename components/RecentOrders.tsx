'use client';

import { Card } from "@/components/ui/Card";
import { Package, Clock, CheckCircle2, XCircle, Truck, ShoppingBag, TrendingUp, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Order {
    _id: string;
    orderId: string;
    customer: {
        name: string;
        email: string;
        avatar?: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped' | 'delivered';
    createdAt: Date | string;
}

interface RecentOrdersProps {
    orders: Order[];
}

const statusConfig = {
    completed: {
        label: 'Completed',
        icon: CheckCircle2,
        color: 'emerald',
        bgClass: 'bg-emerald-50',
        textClass: 'text-emerald-600',
        borderClass: 'border-emerald-200',
        dotClass: 'bg-emerald-500',
    },
    cancelled: {
        label: 'Cancelled',
        icon: XCircle,
        color: 'rose',
        bgClass: 'bg-rose-50',
        textClass: 'text-rose-600',
        borderClass: 'border-rose-200',
        dotClass: 'bg-rose-500',
    },
    processing: {
        label: 'Processing',
        icon: Clock,
        color: 'amber',
        bgClass: 'bg-amber-50',
        textClass: 'text-amber-600',
        borderClass: 'border-amber-200',
        dotClass: 'bg-amber-500',
    },
    pending: {
        label: 'Pending',
        icon: Clock,
        color: 'slate',
        bgClass: 'bg-slate-50',
        textClass: 'text-slate-600',
        borderClass: 'border-slate-200',
        dotClass: 'bg-slate-500',
    },
    shipped: {
        label: 'Shipped',
        icon: Truck,
        color: 'blue',
        bgClass: 'bg-blue-50',
        textClass: 'text-blue-600',
        borderClass: 'border-blue-200',
        dotClass: 'bg-blue-500',
    },
    delivered: {
        label: 'Delivered',
        icon: ShoppingBag,
        color: 'violet',
        bgClass: 'bg-violet-50',
        textClass: 'text-violet-600',
        borderClass: 'border-violet-200',
        dotClass: 'bg-violet-500',
    },
};

export function RecentOrders({ orders }: RecentOrdersProps) {
    const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric' });
    };

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const getItemCount = (items: Order['items']) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        return `${total} item${total > 1 ? 's' : ''}`;
    };

    return (
        <Card className="premium-card p-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Orders</h3>
                            <p className="text-sm text-slate-500 font-medium">Latest activity across all statuses</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-bold text-indigo-600">{orders.length} Total Orders</span>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                <div className="col-span-3">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Order #</span>
                </div>
                <div className="col-span-3">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Customer</span>
                </div>
                <div className="col-span-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Items</span>
                </div>
                <div className="col-span-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Amount</span>
                </div>
                <div className="col-span-1">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Status</span>
                </div>
                <div className="col-span-1">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Date</span>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
                {orders.map((order, index) => {
                    const config = statusConfig[order.status];
                    const StatusIcon = config.icon;
                    const isHovered = hoveredOrder === order._id;

                    return (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            onHoverStart={() => setHoveredOrder(order._id)}
                            onHoverEnd={() => setHoveredOrder(null)}
                            className="relative group"
                        >
                            <div className={`grid grid-cols-12 gap-4 px-6 py-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${isHovered
                                    ? `${config.borderClass} bg-gradient-to-r ${config.bgClass} shadow-lg scale-[1.02]`
                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                }`}>
                                {/* Order ID */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? config.bgClass : 'bg-slate-50'
                                        }`}>
                                        <Package className={`h-5 w-5 transition-colors duration-300 ${isHovered ? config.textClass : 'text-slate-400'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 font-mono tracking-tight">{order.orderId}</p>
                                        <p className="text-xs text-slate-400 font-medium">ID: {order._id}</p>
                                    </div>
                                </div>

                                {/* Customer */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img
                                            src={order.customer.avatar || `https://i.pravatar.cc/100?u=${order.customer.email}`}
                                            alt={order.customer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{order.customer.name}</p>
                                        <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]">{order.customer.email}</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="col-span-2 flex items-center">
                                    <div className={`px-3 py-1.5 rounded-lg transition-colors duration-300 ${isHovered ? 'bg-white/80' : 'bg-slate-50'
                                        }`}>
                                        <p className="text-sm font-bold text-slate-700">{getItemCount(order.items)}</p>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="col-span-2 flex items-center">
                                    <div className="flex flex-col">
                                        <p className="text-base font-black text-slate-900">{formatCurrency(order.totalAmount)}</p>
                                        <p className="text-xs text-slate-400 font-medium">Total</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-1 flex items-center">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${config.bgClass} ${config.borderClass}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${config.dotClass} animate-pulse`}></div>
                                        <span className={`text-xs font-black ${config.textClass} uppercase tracking-wide`}>
                                            {config.label}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Date */}
                                <div className="col-span-1 flex items-center justify-end">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-700">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                {/* Hover Effect - View Details */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${config.bgClass} ${config.borderClass} border-2 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}>
                                            <Eye className={`h-5 w-5 ${config.textClass}`} />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Animated underline effect */}
                            {isHovered && (
                                <motion.div
                                    layoutId="orderHighlight"
                                    className={`absolute bottom-0 left-0 right-0 h-1 rounded-full ${config.dotClass}`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                        <Package className="h-10 w-10 text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium">No orders yet</p>
                    <p className="text-xs text-slate-300 mt-1">Orders will appear here once customers start purchasing</p>
                </div>
            )}

            {/* Footer Stats */}
            {orders.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(
                            orders.reduce((acc, order) => {
                                acc[order.status] = (acc[order.status] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)
                        ).map(([status, count]) => {
                            const config = statusConfig[status as keyof typeof statusConfig];
                            return (
                                <div key={status} className={`p-4 rounded-xl ${config.bgClass} border ${config.borderClass}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-2 h-2 rounded-full ${config.dotClass}`}></div>
                                        <span className={`text-xs font-bold ${config.textClass} uppercase tracking-wide`}>
                                            {config.label}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-black text-slate-900">{count}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Card>
    );
}
