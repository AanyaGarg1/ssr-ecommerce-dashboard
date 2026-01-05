import { ProductForm } from "@/components/ProductForm";
import { Card } from "@/components/ui/Card";

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add New Product</h1>
                <p className="text-gray-500 mt-1">Create a new product for your store</p>
            </div>

            <Card className="p-6">
                <ProductForm />
            </Card>
        </div>
    );
}
