import { Card } from "@/components/ui/Card"
import { Package, TrendingUp, AlertTriangle, IndianRupee, ArrowUpRight, ArrowDownRight, Activity, ShoppingCart, Star } from "lucide-react"
import { ProductChart } from "@/components/ProductChart"
import { getMockProducts } from "@/lib/mock-db"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import connectDB from "@/lib/db";
import Product from "@/models/Product";

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return getMockProducts();
  }
}

export const revalidate = 0;

export default async function DashboardPage() {
  const products = await getProducts();
  const totalProducts = products.length
  const totalStock = products.reduce((acc: number, p: any) => acc + (p.stock || 0), 0)
  const totalValue = products.reduce((acc: number, p: any) => acc + ((p.price || 0) * (p.stock || 0)), 0)
  const lowStockItems = products.filter((p: any) => p.stock < 10).length

  // Advanced analytics
  const topSellers = [...products].sort((a: any, b: any) => (b.sales || 0) - (a.sales || 0)).slice(0, 4);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 font-jakarta">
            Welcome back, <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Here's your business overview for today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
              </div>
            ))}
          </div>
          <Link href="/reports">
            <Button variant="primary" className="rounded-xl shadow-indigo-200">
              View Detailed Reports
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Inventory Size" value={totalProducts} icon={Package} trend="+5%" up={true} color="indigo" />
        <MetricCard title="Stock Volume" value={totalStock} icon={ShoppingCart} trend="+12%" up={true} color="violet" />
        <MetricCard title="Inventory Value" value={`$${(totalValue / 1000).toFixed(1)}k`} icon={IndianRupee} trend="+8%" up={true} color="emerald" />
        <MetricCard title="Priority Alerts" value={lowStockItems} icon={AlertTriangle} trend={lowStockItems > 5 ? "Critical" : "Stable"} up={lowStockItems <= 5} color={lowStockItems > 5 ? "rose" : "amber"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 p-8 premium-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Stock distribution</h3>
              <p className="text-sm text-slate-500 font-medium">Real-time inventory levels per product</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 text-slate-600 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ProductChart data={products} />
          </div>
        </Card>

        <Card className="lg:col-span-4 p-8 premium-card">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Top Performers</h3>
              <p className="text-sm text-slate-500 font-medium">Best selling items this month</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
            </div>
          </div>
          <div className="space-y-6">
            {topSellers.map((product: any) => (
              <div key={product._id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">
                      {product.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center text-amber-500">
                      <span className="text-[10px] font-black">{product.sales || 0} Sales</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">${product.price}</p>
                  <p className="text-[10px] text-emerald-500 font-bold">+{Math.floor(Math.random() * 20) + 5}%</p>
                </div>
              </div>
            ))}
            {topSellers.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs font-medium">No sales data yet</p>
              </div>
            )}
          </div>
          <Link href="/products" className="block mt-8">
            <Button variant="outline" className="w-full rounded-xl gap-2 font-bold py-6 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
              Review Inventory <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon: Icon, trend, up, color }: any) {
  const colors: any = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    violet: "text-violet-600 bg-violet-50 border-violet-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  }

  const iconColors: any = {
    indigo: "bg-indigo-600",
    violet: "bg-violet-600",
    emerald: "bg-emerald-600",
    rose: "bg-rose-600",
    amber: "bg-amber-600",
  }

  return (
    <Card className="premium-card p-6 overflow-hidden relative group">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/50 shadow-lg group-hover:rotate-6 transition-transform duration-300 ${iconColors[color]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </div>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-slate-900 font-jakarta">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
        </div>
      </div>
      {/* Soft decorative glow */}
      <div className={`absolute -right-4 -bottom-4 w-32 h-32 rounded-full blur-3xl opacity-10 transition-transform duration-700 group-hover:scale-150 ${iconColors[color]}`}></div>
    </Card>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
