import { useState } from 'react';
import { Plus, Search, MapPin, MoreVertical, Eye, Edit, Trash2, IndianRupee, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

const rooms = [
  { id: 1, name: 'Flat 102', location: 'Green Towers, Sector 15', owner: 'Suresh Patel', rent: 18000, status: 'occupied', tenant: 'Amit Verma' },
  { id: 2, name: 'Room 205', location: 'Lake View Apartments', owner: 'Anita Sharma', rent: 12000, status: 'occupied', tenant: 'Priya Sharma' },
  { id: 3, name: 'Shop 5', location: 'Market Complex, Main Road', owner: 'Rajesh Kumar', rent: 25000, status: 'vacant', tenant: null },
  { id: 4, name: 'Room 301', location: 'Lake View Apartments', owner: 'Anita Sharma', rent: 10000, status: 'occupied', tenant: 'Meera Singh' },
  { id: 5, name: 'Flat 204', location: 'Sunrise Apartments, Block B', owner: 'Vikram Singh', rent: 22000, status: 'occupied', tenant: 'Karan Mehta' },
  { id: 6, name: 'Room 108', location: 'Green Towers, Sector 15', owner: 'Suresh Patel', rent: 15000, status: 'vacant', tenant: null },
];

export const Rooms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rooms & Properties</h1>
          <p className="text-muted-foreground">Manage all properties and their availability</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Enter the room/property details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="room-name">Room/Property Name</Label>
                <Input id="room-name" placeholder="e.g., Flat 102, Shop 5" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Building name, Area" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Owner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suresh">Suresh Patel</SelectItem>
                    <SelectItem value="anita">Anita Sharma</SelectItem>
                    <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rent">Monthly Rent (₹)</Label>
                <Input id="rent" type="number" placeholder="15000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photos">Photos</Label>
                <Input id="photos" type="file" multiple />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search rooms..." 
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
            <SelectItem value="vacant">Vacant</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room, index) => (
          <div 
            key={room.id} 
            className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image Placeholder */}
            <div className="relative mb-4 h-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <Image className="h-8 w-8 text-muted-foreground/50" />
              <Badge 
                variant={room.status === 'vacant' ? 'vacant' : 'occupied'} 
                className="absolute top-2 right-2"
              >
                {room.status === 'vacant' ? 'Vacant' : 'Occupied'}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{room.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {room.location}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="text-sm font-medium">{room.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Rent</p>
                  <div className="flex items-center gap-0.5 font-semibold text-primary">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {room.rent.toLocaleString()}
                  </div>
                </div>
              </div>

              {room.tenant && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Current Tenant</p>
                  <p className="text-sm font-medium">{room.tenant}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No rooms found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
