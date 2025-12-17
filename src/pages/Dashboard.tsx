import { Users, UserCheck, Home, FileText } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

const alerts = [
  { id: 1, title: 'Agreement Expired', property: 'Shop 5, Market Complex', tenant: 'Ravi Enterprises', daysRemaining: 0, type: 'expired' as const },
  { id: 2, title: 'Expiring Soon', property: 'Flat 102, Green Towers', tenant: 'Amit Verma', daysRemaining: 5, type: 'expiring-soon' as const },
  { id: 3, title: 'Expiring Soon', property: 'Room 301, Lake View', tenant: 'Meera Singh', daysRemaining: 15, type: 'expiring-soon' as const },
  { id: 4, title: 'Expiring', property: 'Flat 204, Sunrise Apt', tenant: 'Karan Mehta', daysRemaining: 28, type: 'expiring' as const },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Raj. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Owners" 
          value={24} 
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Tenants" 
          value={87} 
          icon={UserCheck}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Total Rooms" 
          value={156} 
          icon={Home}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Active Agreements" 
          value={134} 
          icon={FileText}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Alerts & Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expiring Agreements */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Agreement Alerts</h3>
            <span className="text-sm text-destructive font-medium">4 attention needed</span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={alert.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AlertCard {...alert} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};
