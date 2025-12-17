import { Bell, AlertTriangle, XCircle, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const notifications = [
  { 
    id: 1, 
    type: 'expired', 
    title: 'Agreement Expired', 
    message: 'Shop 5, Market Complex - Agreement with Ravi Enterprises has expired',
    time: '2 hours ago',
    read: false
  },
  { 
    id: 2, 
    type: 'expiring-soon', 
    title: 'Agreement Expiring in 5 Days', 
    message: 'Flat 102, Green Towers - Agreement with Amit Verma expires on Dec 22',
    time: '5 hours ago',
    read: false
  },
  { 
    id: 3, 
    type: 'expiring', 
    title: 'Agreement Expiring in 15 Days', 
    message: 'Room 301, Lake View - Agreement with Meera Singh expires on Dec 31',
    time: '1 day ago',
    read: false
  },
  { 
    id: 4, 
    type: 'info', 
    title: 'Agreement Expiring in 28 Days', 
    message: 'Flat 204, Sunrise Apt - Agreement with Karan Mehta expires on Jan 14',
    time: '2 days ago',
    read: true
  },
  { 
    id: 5, 
    type: 'success', 
    title: 'Agreement Renewed', 
    message: 'Room 205, Lake View - Agreement with Priya Sharma was renewed successfully',
    time: '3 days ago',
    read: true
  },
];

export const Notifications = () => {
  const getNotificationConfig = (type: string) => {
    switch (type) {
      case 'expired':
        return {
          icon: XCircle,
          bgColor: 'bg-destructive/10',
          iconColor: 'text-destructive',
          borderColor: 'border-destructive/20'
        };
      case 'expiring-soon':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-warning/10',
          iconColor: 'text-warning',
          borderColor: 'border-warning/20'
        };
      case 'expiring':
        return {
          icon: Clock,
          bgColor: 'bg-primary/10',
          iconColor: 'text-primary',
          borderColor: 'border-primary/20'
        };
      case 'success':
        return {
          icon: Check,
          bgColor: 'bg-success/10',
          iconColor: 'text-success',
          borderColor: 'border-success/20'
        };
      default:
        return {
          icon: Bell,
          bgColor: 'bg-muted',
          iconColor: 'text-muted-foreground',
          borderColor: 'border-border'
        };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with agreement alerts and activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{unreadCount} unread</Badge>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const config = getNotificationConfig(notification.type);
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-sm cursor-pointer animate-slide-up",
                config.bgColor,
                config.borderColor,
                !notification.read && "ring-2 ring-primary/20"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                config.bgColor
              )}>
                <Icon className={cn("h-5 w-5", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={cn(
                    "font-medium text-foreground",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No notifications</h3>
          <p className="text-muted-foreground mt-1">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};
