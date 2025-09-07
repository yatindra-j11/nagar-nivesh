import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, Edit, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'urgent';
  assignedDept: string;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
}

const mockReports: Report[] = [
  {
    id: '2451',
    category: 'Water Leak',
    location: 'Main St & 1st Ave',
    status: 'urgent',
    assignedDept: 'Water Department',
    date: '2024-01-15',
    priority: 'urgent',
    description: 'Major water leak causing street flooding'
  },
  {
    id: '2450',
    category: 'Pothole',
    location: 'Oak Street 500 block',
    status: 'in-progress',
    assignedDept: 'Public Works',
    date: '2024-01-14',
    priority: 'medium',
    description: 'Large pothole affecting traffic flow'
  },
  {
    id: '2449',
    category: 'Streetlight',
    location: 'Central Park Path',
    status: 'resolved',
    assignedDept: 'Electrical',
    date: '2024-01-13',
    priority: 'low',
    description: 'Broken streetlight - safety concern'
  },
  {
    id: '2448',
    category: 'Graffiti',
    location: 'City Hall Wall',
    status: 'pending',
    assignedDept: 'Maintenance',
    date: '2024-01-12',
    priority: 'low',
    description: 'Vandalism on public building'
  },
];

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, statusFilter, categoryFilter]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'in-progress': return 'secondary';
      case 'urgent': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-status-urgent';
      case 'high': return 'text-red-600';
      case 'medium': return 'text-status-pending';
      default: return 'text-muted-foreground';
    }
  };

  const updateStatus = async (reportId: string, newStatus: string) => {
    try {
      // Mock API call
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: newStatus as any }
          : report
      ));
      
      toast({
        title: "Status updated",
        description: `Report #${reportId} status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };

  const categories = Array.from(new Set(reports.map(r => r.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports Management</h1>
          <p className="text-muted-foreground">
            View and manage civic issue reports from citizens
          </p>
        </div>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
          <CardDescription>
            Search and filter reports by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">#{report.id}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.assignedDept}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Select
                        value={report.status}
                        onValueChange={(value) => updateStatus(report.id, value)}
                      >
                        <SelectTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;