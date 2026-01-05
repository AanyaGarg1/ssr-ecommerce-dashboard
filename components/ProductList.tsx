'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';

export function ProductList({ initialProducts }: { initialProducts: any[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-3">
                                        {product.images && product.images.length > 0 && (
                                            <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                        )}
                                        <span>{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-900">${product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={product.stock < 10 ? "text-red-500 font-medium" : "text-green-600"}>
                                        {product.stock} {product.stock < 10 && '(Low)'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/products/${product._id}/edit`}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(product._id)}
                                            disabled={isDeleting === product._id}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {initialProducts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No products found. Add your first product to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
