import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getMockProducts } from "@/lib/mock-db";

async function getProducts() {
    try {
        await connectDB();
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.warn("ProductsPage: DB connection failed, using mock data");
        return getMockProducts();
    }
}

export const revalidate = 0;

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your product inventory</p>
                </div>
                <Link href="/products/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>

            <ProductList initialProducts={products} />
        </div>
    );
}
