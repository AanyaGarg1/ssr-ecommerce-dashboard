'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function ProductChart({ data }: { data: any[] }) {
    // Aggregate data for the chart (e.g., stock per category)
    // For simplicity, let's just map product names to stock
    const chartData = data.slice(0, 10).map(p => ({ // Only show top 10
        name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
        stock: p.stock,
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="stock" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    )
}
