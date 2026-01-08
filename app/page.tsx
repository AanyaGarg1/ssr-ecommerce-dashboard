import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductChart } from "@/components/ProductChart";
import { Card } from "@/components/ui/Card";
import { Package, DollarSign, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Users, Activity } from "lucide-react";
import { getMockProducts } from "@/lib/mock-db";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.warn("DashboardPage: DB connection failed, using mock data");
    return getMockProducts();
  }
}

export const revalidate = 0;

export default async function DashboardPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const totalStock = products.reduce((acc: number, curr: any) => acc + curr.stock, 0);
  const lowStockProducts = products.filter((p: any) => p.stock < 10).length;
  const totalValue = products.reduce((acc: number, curr: any) => acc + (curr.price * curr.stock), 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 font-jakarta">
            Welcome back, <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                U{i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">
              +4
            </div>
          </div>
          <button className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Activity className="h-4 w-4 text-indigo-500" /> Live View
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          trend="+12%"
          trendUp={true}
          color="indigo"
        />
        <MetricCard
          title="Total Stock"
          value={totalStock.toLocaleString()}
          icon={Activity}
          trend="+5.4%"
          trendUp={true}
          color="blue"
        />
        <MetricCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={DollarSign}
          trend="+8.2%"
          trendUp={true}
          color="emerald"
        />
        <MetricCard
          title="Low Stock Alert"
          value={lowStockProducts}
          icon={AlertTriangle}
          trend={lowStockProducts > 5 ? "Critical" : "Stable"}
          trendUp={lowStockProducts <= 5}
          color={lowStockProducts > 5 ? "rose" : "amber"}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <Card className="lg:col-span-8 p-8 premium-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl text-slate-900">Inventory Distribution</h3>
              <p className="text-sm text-slate-500 font-medium">Stock levels analyzed by product</p>
            </div>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 px-3 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ProductChart data={products} />
          </div>
        </Card>

        <Card className="lg:col-span-4 p-8 premium-card">
          <div className="mb-8">
            <h3 className="font-bold text-xl text-slate-900">Recently Added</h3>
            <p className="text-sm text-slate-500 font-medium">Track your latest catalog growth</p>
          </div>
          <div className="space-y-5">
            {products.slice(0, 5).map((product: any) => (
              <div key={product._id} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 group-hover:scale-110 transition-transform">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">
                      {product.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{product.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 font-jakarta">${product.price}</p>
                  <p className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full inline-block",
                    product.stock < 10 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {product.stock} in stock
                  </p>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-slate-200" />
                </div>
                <p className="text-sm text-slate-400 font-medium">No products registered yet</p>
              </div>
            )}
            {products.length > 5 && (
              <button className="w-full py-3 rounded-xl border border-dashed border-slate-200 text-xs font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all uppercase tracking-widest mt-4">
                View All Products
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
  const colorClasses: any = {
    indigo: "from-indigo-50 to-indigo-100/50 text-indigo-600 border-indigo-100",
    blue: "from-blue-50 to-blue-100/50 text-blue-600 border-blue-100",
    emerald: "from-emerald-50 to-emerald-100/50 text-emerald-600 border-emerald-100",
    amber: "from-amber-50 to-amber-100/50 text-amber-600 border-amber-100",
    rose: "from-rose-50 to-rose-100/50 text-rose-600 border-rose-100",
  };

  const iconBg: any = {
    indigo: "bg-indigo-600 shadow-indigo-200",
    blue: "bg-blue-600 shadow-blue-200",
    emerald: "bg-emerald-600 shadow-emerald-200",
    amber: "bg-amber-600 shadow-amber-200",
    rose: "bg-rose-600 shadow-rose-200",
  }

  return (
    <Card className="premium-card p-6 overflow-hidden relative group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 group-hover:scale-150 transition-transform duration-700 ${colorClasses[color]}`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl ${iconBg[color]} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className={cn("flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg",
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </div>
        </div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
        <h4 className="text-3xl font-black text-slate-900 font-jakarta">{value}</h4>
      </div>
    </Card>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

