import { UserPlus, Home, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    icon: UserPlus,
    title: 'New tenant added',
    description: 'Priya Sharma was added as tenant for Room 205',
    time: '2 hours ago',
    color: 'bg-success/10 text-success'
  },
  {
    id: 2,
    icon: FileText,
    title: 'Agreement created',
    description: 'New agreement for Flat 102 with Amit Verma',
    time: '5 hours ago',
    color: 'bg-primary/10 text-primary'
  },
  {
    id: 3,
    icon: Home,
    title: 'Room updated',
    description: 'Shop 5 rent updated to ₹25,000',
    time: '1 day ago',
    color: 'bg-warning/10 text-warning'
  },
  {
    id: 4,
    icon: Users,
    title: 'New owner added',
    description: 'Suresh Patel added with 3 properties',
    time: '2 days ago',
    color: 'bg-accent text-accent-foreground'
  },
];

export const RecentActivity = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
              activity.color
            )}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
