'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormValues } from '@/lib/schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const STEPS = [
    { id: 1, title: 'Basic Info' },
    { id: 2, title: 'Pricing & Stock' },
    { id: 3, title: 'Images' },
];

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [uploading, setUploading] = useState(false);

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
        mode: 'onChange',
    });

    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch, trigger } = form;
    const images = watch('images') || [];

    const nextStep = async () => {
        let fieldsToValidate: any[] = [];
        if (step === 1) fieldsToValidate = ['name', 'category', 'description'];
        if (step === 2) fieldsToValidate = ['price', 'stock'];

        const isStepValid = await trigger(fieldsToValidate as any);
        if (isStepValid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setValue('images', [...images, data.url]);
            } else {
                alert(data.message || 'Upload failed. Ensure Cloudinary credentials are set.');
            }
        } catch (error) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || result.error || 'Something went wrong');
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
        <div className="max-w-4xl mx-auto">
            {/* Step Progress Bar */}
            <div className="mb-12">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-primary-600 transition-all duration-500 -z-10 -translate-y-1/2"
                        style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                    />
                    {STEPS.map((s) => (
                        <div key={s.id} className="flex flex-col items-center">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                step >= s.id ? "bg-primary-600 border-primary-600 text-white shadow-lg" : "bg-white border-gray-300 text-gray-400"
                            )}>
                                {step > s.id ? <Check className="h-5 w-5" /> : s.id}
                            </div>
                            <span className={cn(
                                "mt-2 text-xs font-semibold",
                                step >= s.id ? "text-primary-700" : "text-gray-400"
                            )}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/50 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                    <Input {...register('name')} placeholder="e.g. Premium Silk Scarf" className="h-12 text-lg" />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Category</label>
                                    <Input {...register('category')} placeholder="e.g. Accessories" className="h-12" />
                                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Description</label>
                                    <textarea
                                        className="flex min-h-[120px] w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-all"
                                        {...register('description')}
                                        placeholder="Tell buyers why they need this product..."
                                    />
                                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Price ($)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                                        <Input type="number" step="0.01" {...register('price')} className="pl-8 h-12 text-xl font-bold text-primary-600" />
                                    </div>
                                    {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Initial Stock</label>
                                    <Input type="number" {...register('stock')} className="h-12 text-center text-xl font-bold" />
                                    {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-700">Product Images (Powered by Cloudinary)</label>
                                <div className="flex flex-wrap gap-4">
                                    <label className={cn(
                                        "w-32 h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-primary-50 hover:border-primary-500 transition-all group",
                                        uploading ? "opacity-50 cursor-wait" : ""
                                    )}>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                        {uploading ? (
                                            <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                                        ) : (
                                            <>
                                                <Upload className="h-6 w-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                                                <span className="text-[10px] mt-1 font-bold text-gray-400 group-hover:text-primary-600">UPLOAD</span>
                                            </>
                                        )}
                                    </label>

                                    {images.map((url, index) => (
                                        <div key={index} className="relative w-32 h-32 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                                            <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-white/90 backdrop-blur shadow text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 italic">Images are stored securely using Cloudinary's global CDN.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
                    {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep} className="rounded-xl px-6">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < STEPS.length ? (
                        <Button type="button" onClick={nextStep} className="rounded-xl px-8 bg-black text-white hover:bg-gray-800">
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit" disabled={loading} className="rounded-xl px-8 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            {isEditing ? 'Update Listing' : 'Publish Product'}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
