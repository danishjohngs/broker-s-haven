import { useState } from 'react';
import { Plus, Search, Phone, MoreVertical, Eye, Edit, Trash2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const tenants = [
  { id: 1, name: 'Amit Verma', phone: '+91 98765 43210', room: 'Flat 102, Green Towers', rent: '₹18,000', status: 'active', checkIn: '2024-01-15' },
  { id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', room: 'Room 205, Lake View', rent: '₹12,000', status: 'active', checkIn: '2024-03-01' },
  { id: 3, name: 'Ravi Enterprises', phone: '+91 76543 21098', room: 'Shop 5, Market Complex', rent: '₹25,000', status: 'expired', checkIn: '2023-06-15' },
  { id: 4, name: 'Meera Singh', phone: '+91 65432 10987', room: 'Room 301, Lake View', rent: '₹10,000', status: 'expiring', checkIn: '2023-12-20' },
  { id: 5, name: 'Karan Mehta', phone: '+91 54321 09876', room: 'Flat 204, Sunrise Apt', rent: '₹22,000', status: 'active', checkIn: '2024-02-10' },
];

export const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.phone.includes(searchQuery) ||
    tenant.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="active">Active</Badge>;
      case 'expiring':
        return <Badge variant="expiring">Expiring Soon</Badge>;
      case 'expired':
        return <Badge variant="expired">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tenants</h1>
          <p className="text-muted-foreground">Manage tenants and their rental information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the tenant's details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter tenant name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room">Assign Room</Label>
                <Input id="room" placeholder="Select or enter room" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="id-proof">ID Proof</Label>
                <Input id="id-proof" type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photo">Tenant Photo</Label>
                <Input id="photo" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Tenant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search tenants..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Tenant</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Room/Property</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Agreement Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-medium">
                      {tenant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <span className="font-medium block">{tenant.name}</span>
                      <span className="text-xs text-muted-foreground">Since {tenant.checkIn}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {tenant.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    {tenant.room}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{tenant.rent}/mo</TableCell>
                <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No tenants found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
