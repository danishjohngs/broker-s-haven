import { useState } from 'react';
import { Plus, Search, Calendar, MoreVertical, Eye, Edit, Trash2, FileText, Download } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const agreements = [
  { id: 1, property: 'Flat 102, Green Towers', tenant: 'Amit Verma', owner: 'Suresh Patel', checkIn: '2024-01-15', expiry: '2025-01-14', status: 'active', rent: 18000 },
  { id: 2, property: 'Room 205, Lake View', tenant: 'Priya Sharma', owner: 'Anita Sharma', checkIn: '2024-03-01', expiry: '2025-02-28', status: 'active', rent: 12000 },
  { id: 3, property: 'Shop 5, Market Complex', tenant: 'Ravi Enterprises', owner: 'Rajesh Kumar', checkIn: '2023-06-15', expiry: '2024-06-14', status: 'expired', rent: 25000 },
  { id: 4, property: 'Room 301, Lake View', tenant: 'Meera Singh', owner: 'Anita Sharma', checkIn: '2023-12-20', expiry: '2024-12-19', status: 'expiring', rent: 10000 },
  { id: 5, property: 'Flat 204, Sunrise Apt', tenant: 'Karan Mehta', owner: 'Vikram Singh', checkIn: '2024-02-10', expiry: '2025-02-09', status: 'active', rent: 22000 },
];

export const Agreements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const getDaysRemaining = (expiry: string) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agreements</h1>
          <p className="text-muted-foreground">Manage rental agreements and track expiry dates</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              New Agreement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Agreement</DialogTitle>
              <DialogDescription>
                Enter the agreement details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amit">Amit Verma</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                      <SelectItem value="meera">Meera Singh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat102">Flat 102, Green Towers</SelectItem>
                      <SelectItem value="room205">Room 205, Lake View</SelectItem>
                      <SelectItem value="shop5">Shop 5, Market Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="checkin">Check-in Date</Label>
                  <Input id="checkin" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rent">Monthly Rent (₹)</Label>
                <Input id="rent" type="number" placeholder="15000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document">Agreement Document</Label>
                <Input id="document" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Create Agreement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search agreements..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring Soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgreements.map((agreement) => {
              const daysRemaining = getDaysRemaining(agreement.expiry);
              return (
                <TableRow key={agreement.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{agreement.property}</span>
                    </div>
                  </TableCell>
                  <TableCell>{agreement.tenant}</TableCell>
                  <TableCell className="text-muted-foreground">{agreement.owner}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {agreement.checkIn} → {agreement.expiry}
                      </div>
                      {agreement.status !== 'expired' && (
                        <p className={`text-xs ${daysRemaining <= 30 ? 'text-warning' : 'text-muted-foreground'}`}>
                          {daysRemaining} days remaining
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">₹{agreement.rent.toLocaleString()}/mo</TableCell>
                  <TableCell>{getStatusBadge(agreement.status)}</TableCell>
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
                          <Download className="h-4 w-4 mr-2" />
                          Download
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
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredAgreements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No agreements found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
