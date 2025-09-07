import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapReport {
  id: string;
  lat: number;
  lng: number;
  category: string;
  status: string;
  description: string;
  date: string;
  priority: string;
}

const mockMapReports: MapReport[] = [
  {
    id: '2451',
    lat: 40.7128,
    lng: -74.0060,
    category: 'Water Leak',
    status: 'urgent',
    description: 'Major water leak causing street flooding',
    date: '2024-01-15',
    priority: 'urgent'
  },
  {
    id: '2450',
    lat: 40.7589,
    lng: -73.9851,
    category: 'Pothole',
    status: 'in-progress',
    description: 'Large pothole affecting traffic flow',
    date: '2024-01-14',
    priority: 'medium'
  },
  {
    id: '2449',
    lat: 40.7505,
    lng: -73.9934,
    category: 'Streetlight',
    status: 'resolved',
    description: 'Broken streetlight - safety concern',
    date: '2024-01-13',
    priority: 'low'
  },
  {
    id: '2448',
    lat: 40.7282,
    lng: -74.0776,
    category: 'Graffiti',
    status: 'pending',
    description: 'Vandalism on public building',
    date: '2024-01-12',
    priority: 'low'
  }
];

const MapView = () => {
  const [reports, setReports] = useState<MapReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<MapReport[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    setReports(mockMapReports);
    setFilteredReports(mockMapReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    setFilteredReports(filtered);
  }, [reports, statusFilter, categoryFilter]);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'urgent': return '#ef4444';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#22c55e';
      default: return '#f59e0b';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'in-progress': return 'secondary';
      case 'urgent': return 'destructive';
      default: return 'outline';
    }
  };

  const categories = Array.from(new Set(reports.map(r => r.category)));

  const createCustomIcon = (status: string) => {
    const color = getMarkerColor(status);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Map</h1>
          <p className="text-muted-foreground">
            Geographic view of civic issue reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Map View</CardTitle>
            <CardDescription>
              Click on markers to view report details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] rounded-lg overflow-hidden border">
              <MapContainer
                center={[40.7128, -74.0060]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredReports.map((report) => (
                  <Marker
                    key={report.id}
                    position={[report.lat, report.lng]}
                    icon={createCustomIcon(report.status)}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">#{report.id}</h4>
                          <Badge variant={getStatusVariant(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{report.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { status: 'urgent', label: 'Urgent', color: '#ef4444' },
                { status: 'in-progress', label: 'In Progress', color: '#3b82f6' },
                { status: 'resolved', label: 'Resolved', color: '#22c55e' },
                { status: 'pending', label: 'Pending', color: '#f59e0b' },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Reports:</span>
                  <span className="font-medium">{filteredReports.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgent:</span>
                  <span className="font-medium text-status-urgent">
                    {filteredReports.filter(r => r.status === 'urgent').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>In Progress:</span>
                  <span className="font-medium text-status-in-progress">
                    {filteredReports.filter(r => r.status === 'in-progress').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Resolved:</span>
                  <span className="font-medium text-status-resolved">
                    {filteredReports.filter(r => r.status === 'resolved').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;