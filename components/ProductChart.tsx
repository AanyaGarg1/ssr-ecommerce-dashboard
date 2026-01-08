'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

export function ProductChart({ data }: { data: any[] }) {
    const chartData = data.slice(0, 8).map(p => ({
        name: p.name.length > 12 ? p.name.substring(0, 12) + '...' : p.name,
        stock: p.stock,
        fullName: p.name
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xl">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                        {payload[0].payload.fullName}
                                    </p>
                                    <p className="text-lg font-black text-indigo-600">
                                        {payload[0].value} <span className="text-xs font-bold text-slate-400">units</span>
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar
                    dataKey="stock"
                    fill="url(#barGradient)"
                    radius={[8, 8, 4, 4]}
                    barSize={45}
                    animationDuration={1500}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} className="hover:opacity-80 transition-opacity" />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

