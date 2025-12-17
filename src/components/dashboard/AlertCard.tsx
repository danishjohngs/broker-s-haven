import { AlertTriangle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  title: string;
  property: string;
  tenant: string;
  daysRemaining: number;
  type: 'expiring-soon' | 'expiring' | 'expired';
}

export const AlertCard = ({ title, property, tenant, daysRemaining, type }: AlertCardProps) => {
  const getAlertConfig = () => {
    switch (type) {
      case 'expired':
        return {
          icon: XCircle,
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          iconColor: 'text-destructive',
          badgeVariant: 'expired' as const,
          label: 'Expired'
        };
      case 'expiring-soon':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          iconColor: 'text-warning',
          badgeVariant: 'expiring' as const,
          label: `${daysRemaining} days left`
        };
      default:
        return {
          icon: Clock,
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          iconColor: 'text-primary',
          badgeVariant: 'active' as const,
          label: `${daysRemaining} days left`
        };
    }
  };

  const config = getAlertConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-center gap-4 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm",
      config.bgColor,
      config.borderColor
    )}>
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        config.bgColor
      )}>
        <Icon className={cn("h-5 w-5", config.iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{title}</p>
        <p className="text-sm text-muted-foreground truncate">
          {property} • {tenant}
        </p>
      </div>
      <Badge variant={config.badgeVariant}>
        {config.label}
      </Badge>
    </div>
  );
};
