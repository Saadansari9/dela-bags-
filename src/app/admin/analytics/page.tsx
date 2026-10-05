'use client';

import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  const CATEGORY_BREAKDOWN = [
    { category: 'Ladies Handbags', sales: '₹1,84,200', percentage: '40%' },
    { category: 'Sling Bags', sales: '₹1,15,100', percentage: '25%' },
    { category: 'Tote Bags', sales: '₹92,000', percentage: '20%' },
    { category: 'Men\'s Bags', sales: '₹69,000', percentage: '15%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Sales Analytics & Insights</h2>
        <p className="text-muted-foreground text-sm">Performance metrics, revenue breakdown, and store statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">₹4,60,300</div>
            <p className="text-xs text-emerald-700 flex items-center font-medium mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,420</div>
            <p className="text-xs text-blue-700 flex items-center font-medium mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18.2% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,240</div>
            <p className="text-xs text-muted-foreground mt-1">High conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Repeat Customers</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.4%</div>
            <p className="text-xs text-emerald-700 font-medium mt-1">+5.2% brand loyalty</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Sales Distribution by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {CATEGORY_BREAKDOWN.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{item.category}</span>
                  <span className="font-mono text-muted-foreground">{item.sales} ({item.percentage})</span>
                </div>
                <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
