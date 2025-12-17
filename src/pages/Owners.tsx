import { useState } from 'react';
import { Plus, Search, Phone, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
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

const owners = [
  { id: 1, name: 'Suresh Patel', phone: '+91 98765 43210', properties: 5, totalRent: '₹1,25,000', status: 'active' },
  { id: 2, name: 'Anita Sharma', phone: '+91 87654 32109', properties: 3, totalRent: '₹75,000', status: 'active' },
  { id: 3, name: 'Rajesh Kumar', phone: '+91 76543 21098', properties: 8, totalRent: '₹2,00,000', status: 'active' },
  { id: 4, name: 'Priya Verma', phone: '+91 65432 10987', properties: 2, totalRent: '₹45,000', status: 'active' },
  { id: 5, name: 'Vikram Singh', phone: '+91 54321 09876', properties: 6, totalRent: '₹1,50,000', status: 'active' },
];

export const Owners = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Owners</h1>
          <p className="text-muted-foreground">Manage property owners and their details</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Owner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Owner</DialogTitle>
              <DialogDescription>
                Enter the owner's details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter owner name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="owner@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Owner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search owners..." 
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
              <TableHead>Owner</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Properties</TableHead>
              <TableHead>Total Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOwners.map((owner) => (
              <TableRow key={owner.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{owner.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {owner.phone}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{owner.properties}</Badge>
                </TableCell>
                <TableCell className="font-medium">{owner.totalRent}</TableCell>
                <TableCell>
                  <Badge variant="active">Active</Badge>
                </TableCell>
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
      {filteredOwners.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No owners found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
