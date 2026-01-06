'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormValues } from '@/lib/schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageInput, setImageInput] = useState('');

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            images: [],
        },
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
    const images = watch('images') || [];

    const addImage = () => {
        if (imageInput) {
            setValue('images', [...images, imageInput]);
            setImageInput('');
        }
    };

    const removeImage = (index: number) => {
        setValue('images', images.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true);
        try {
            const url = isEditing ? `/api/products/${initialData._id}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                let errorMessage = 'Something went wrong';
                try {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const errorData = await res.json();
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } else {
                        errorMessage = await res.text();
                    }
                } catch (e) {
                    // ignore
                }
                throw new Error(errorMessage);
            }

            router.push('/products');
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                    <Input {...register('name')} placeholder="Product Name" />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
                    <Input {...register('category')} placeholder="Category (e.g. Electronics)" />
                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price ($)</label>
                    <Input type="number" step="0.01" {...register('price')} placeholder="0.00" />
                    {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Stock</label>
                    <Input type="number" {...register('stock')} placeholder="0" />
                    {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
                    <textarea
                        className={cn(
                            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        {...register('description')}
                        placeholder="Product Description"
                        rows={4}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Images</label>
                    <div className="flex gap-2">
                        <Input
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            placeholder="Enter Image URL"
                        />
                        <Button type="button" onClick={addImage} variant="secondary">Add</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((url, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                                <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isEditing ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
}
