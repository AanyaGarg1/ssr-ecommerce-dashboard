import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductForm } from "@/components/ProductForm";
import { Card } from "@/components/ui/Card";
import { notFound } from "next/navigation";
import { getMockProduct } from "@/lib/mock-db";

async function getProduct(id: string) {
    try {
        await connectDB();
        const product = await Product.findById(id).lean();
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.warn("EditProductPage: DB connection failed, using mock data");
        return getMockProduct(id) || null;
    }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Product</h1>
                <p className="text-gray-500 mt-1">Update product details</p>
            </div>

            <Card className="p-6">
                <ProductForm initialData={product} isEditing />
            </Card>
        </div>
    );
}
