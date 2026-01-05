import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductChart } from "@/components/ProductChart";
import { Card } from "@/components/ui/Card";
import { Package, DollarSign, AlertTriangle } from "lucide-react";
import { getMockProducts } from "@/lib/mock-db";

async function getProducts() {
  try {
    await connectDB();
    // We need to jsonify the result because we pass it to client components
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.warn("DashboardPage: DB connection failed, using mock data");
    return getMockProducts();
  }
}

export const revalidate = 0; // Disable cache for dashboard

export default async function DashboardPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const totalStock = products.reduce((acc: number, curr: any) => acc + curr.stock, 0);
  const lowStockProducts = products.filter((p: any) => p.stock < 10).length;
  // Calculate total value?
  const totalValue = products.reduce((acc: number, curr: any) => acc + (curr.price * curr.stock), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 flex flex-col gap-1 shadow-sm border-gray-100">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Package className="h-4 w-4 text-primary-500" /> Total Products
          </span>
          <span className="text-2xl font-bold text-gray-900">{totalProducts}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-1 shadow-sm border-gray-100">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Package className="h-4 w-4 text-primary-500" /> Total Stock
          </span>
          <span className="text-2xl font-bold text-gray-900">{totalStock}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-1 shadow-sm border-gray-100">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" /> Inventory Value
          </span>
          <span className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</span>
        </Card>
        <Card className="p-6 flex flex-col gap-1 shadow-sm border-gray-100">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" /> Low Stock Items
          </span>
          <span className="text-2xl font-bold text-gray-900">{lowStockProducts}</span>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6 shadow-sm border-gray-100">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-900">Stock Overview</h3>
            <p className="text-sm text-gray-500">Stock levels per product (top 10)</p>
          </div>
          <ProductChart data={products} />
        </Card>
        <Card className="col-span-3 p-6 shadow-sm border-gray-100">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-900">Recent Products</h3>
            <p className="text-sm text-gray-500">Latest additions to inventory</p>
          </div>
          <div className="space-y-4">
            {products.slice(0, 5).map((product: any) => (
              <div key={product._id} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 truncate max-w-[150px]">{product.name}</span>
                  <span className="text-xs text-gray-500">{product.category}</span>
                </div>
                <div className="font-medium text-primary-600">
                  ${product.price}
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-sm text-gray-500">No products found.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
