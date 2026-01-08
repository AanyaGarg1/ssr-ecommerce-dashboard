'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, MoreVertical, Search, Filter, ArrowUpDown, ChevronRight, Package, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductList({ initialProducts }: { initialProducts: any[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = initialProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            alert('An error occurred');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products or categories..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowUpDown className="h-4 w-4" /> Sort
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Product Info</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pricing</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Stock Level</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={product._id}
                                        className="hover:bg-indigo-50/30 transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">
                                                            {product.name[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</span>
                                                    <span className="text-xs text-slate-400 font-medium font-mono">ID: {product._id.substring(0, 8)}...</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col font-jakarta">
                                                <span className="font-black text-slate-900">${product.price.toLocaleString()}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">USD per unit</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between text-[11px] font-bold">
                                                    <span className={product.stock < 10 ? "text-rose-500" : "text-emerald-500"}>
                                                        {product.stock} Units
                                                    </span>
                                                    <span className="text-slate-400">{Math.min(100, (product.stock / 50) * 100).toFixed(0)}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-500",
                                                            product.stock < 10 ? "bg-rose-500" : "bg-emerald-500"
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    {product.stock < 10 ? (
                                                        <><AlertCircle className="h-3 w-3 text-rose-500" /><span className="text-[10px] text-rose-500 font-bold italic">Low Inventory</span></>
                                                    ) : (
                                                        <><CheckCircle2 className="h-3 w-3 text-emerald-500" /><span className="text-[10px] text-emerald-500 font-bold">In Stock</span></>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/products/${product._id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-10 w-10 p-0 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-slate-100"
                                                    onClick={() => handleDelete(product._id)}
                                                    disabled={isDeleting === product._id}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-slate-400">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Search className="h-10 w-10 text-slate-200" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">No products found</p>
                                                <p className="text-sm text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                                            </div>
                                            <Button variant="outline" className="mt-2 rounded-xl" onClick={() => setSearchQuery('')}>
                                                Clear Search
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

