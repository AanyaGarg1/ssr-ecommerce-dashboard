'use client';

import { Card } from "@/components/ui/Card";
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { TrendingUp, Users, ShoppingBag, CreditCard, ArrowUpRight, ArrowDownRight, Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const salesData = [
    { name: 'Jan', revenue: 45000, profit: 32000 },
    { name: 'Feb', revenue: 52000, profit: 38000 },
    { name: 'Mar', revenue: 48000, profit: 34000 },
    { name: 'Apr', revenue: 61000, profit: 42000 },
    { name: 'May', revenue: 55000, profit: 39000 },
    { name: 'Jun', revenue: 67000, profit: 48000 },
    { name: 'Jul', revenue: 72000, profit: 54000 },
];

const categoryData = [
    { name: 'Computers', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Smart Home', value: 200 },
    { name: 'Audio', value: 100 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function ReportsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 font-jakarta">
                        Financial <span className="text-gradient">Reports</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Comprehensive analysis of your store's performance.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Printer className="h-4 w-4" /> Print
                    </Button>
                    <Button variant="primary" className="gap-2 rounded-xl">
                        <Download className="h-4 w-4" /> Export Data
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Revenue" value="$42,560.00" trend="+14.5%" up={true} icon={CreditCard} />
                <StatCard title="Active Customers" value="8,432" trend="+5.2%" up={true} icon={Users} />
                <StatCard title="Total Orders" value="1,240" trend="-2.4%" up={false} icon={ShoppingBag} />
                <StatCard title="Avg. Order Value" value="$154.20" trend="+8.1%" up={true} icon={TrendingUp} />
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                <Card className="lg:col-span-8 p-8 premium-card">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-slate-900">Revenue Growth</h3>
                            <p className="text-sm text-slate-500 font-medium">Monthly revenue vs profit analysis</p>
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="profit" stroke="#ec4899" strokeWidth={3} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="lg:col-span-4 p-8 premium-card">
                    <div className="mb-8">
                        <h3 className="font-bold text-xl text-slate-900">Sales by Category</h3>
                        <p className="text-sm text-slate-500 font-medium">Distribution of product sales</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-3">
                        {categoryData.map((cat, i) => (
                            <div key={cat.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                    <span className="text-sm font-bold text-slate-600">{cat.name}</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{cat.value} Sales</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, up, icon: Icon }: any) {
    return (
        <Card className="premium-card p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm text-indigo-600">
                    <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {trend}
                </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-2xl font-black text-slate-900 font-jakarta">{value}</h4>
        </Card>
    );
}
