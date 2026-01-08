'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, MoreVertical, Search, Filter, ArrowUpDown, ChevronRight, Package, AlertCircle, CheckCircle2, LayoutGrid, List as ListIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductList({ initialProducts }: { initialProducts: any[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products or categories..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl mr-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                        >
                            <ListIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowUpDown className="h-4 w-4" /> Sort
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
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
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-32 text-center text-slate-400 font-medium">No results found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={product._id}
                                className="group relative bg-white rounded-[2rem] p-4 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="relative aspect-square rounded-[1.5rem] bg-slate-100 overflow-hidden mb-6">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-2xl">
                                            {product.name[0]}
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg",
                                            product.stock < 10 ? "bg-rose-500/90 text-white" : "bg-emerald-500/90 text-white"
                                        )}>
                                            {product.stock} in stock
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                        <Link href={`/products/${product._id}/edit`}>
                                            <Button size="icon" className="rounded-2xl bg-white text-slate-900 hover:bg-white/90 scale-90 group-hover:scale-100 transition-all duration-300">
                                                <Edit className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="rounded-2xl scale-90 group-hover:scale-100 transition-all duration-300"
                                            onClick={() => handleDelete(product._id)}
                                            disabled={isDeleting === product._id}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="px-2 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h4>
                                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{product.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="font-jakarta">
                                            <p className="text-[10px] font-bold text-slate-400 leading-none">Price</p>
                                            <p className="text-2xl font-black text-slate-900">${product.price.toLocaleString()}</p>
                                        </div>
                                        <div className="flex -space-x-1">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                    +{i * 2}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

