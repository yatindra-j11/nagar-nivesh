import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  urgentReports: number;
  avgResponseTime: string;
  activeUsers: number;
}

const Overview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    urgentReports: 0,
    avgResponseTime: '0h',
    activeUsers: 0
  });

  useEffect(() => {
    // Mock API call - replace with real endpoint
    const fetchStats = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        totalReports: 1247,
        pendingReports: 23,
        resolvedReports: 1186,
        urgentReports: 8,
        avgResponseTime: '2.4h',
        activeUsers: 156
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.totalReports.toLocaleString(),
      description: 'All time submissions',
      icon: FileText,
      trend: '+12% from last month'
    },
    {
      title: 'Pending',
      value: stats.pendingReports.toString(),
      description: 'Awaiting review',
      icon: Clock,
      trend: '-5% from yesterday',
      variant: 'pending' as const
    },
    {
      title: 'Resolved',
      value: stats.resolvedReports.toLocaleString(),
      description: 'Completed issues',
      icon: CheckCircle,
      trend: '+8% this week',
      variant: 'resolved' as const
    },
    {
      title: 'Urgent',
      value: stats.urgentReports.toString(),
      description: 'High priority',
      icon: AlertTriangle,
      trend: '2 new today',
      variant: 'urgent' as const
    },
    {
      title: 'Avg Response Time',
      value: stats.avgResponseTime,
      description: 'Time to first response',
      icon: TrendingUp,
      trend: '12min faster'
    },
    {
      title: 'Active Citizens',
      value: stats.activeUsers.toString(),
      description: 'Engaged this month',
      icon: Users,
      trend: '+23% growth'
    }
  ];

  const getVariantClass = (variant?: string) => {
    switch (variant) {
      case 'pending': return 'border-status-pending';
      case 'resolved': return 'border-status-resolved';
      case 'urgent': return 'border-status-urgent';
      default: return 'border-primary';
    }
  };

  const getIconClass = (variant?: string) => {
    switch (variant) {
      case 'pending': return 'text-status-pending';
      case 'resolved': return 'text-status-resolved';
      case 'urgent': return 'text-status-urgent';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor civic issues and system performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title} className={`border-l-4 ${getVariantClass(card.variant)}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${getIconClass(card.variant)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  {card.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest civic issue reports and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 min ago', action: 'New report submitted', location: 'Main St & 1st Ave', type: 'Pothole' },
                { time: '15 min ago', action: 'Issue resolved', location: 'Central Park', type: 'Lighting' },
                { time: '1 hour ago', action: 'Report assigned', location: 'City Hall Area', type: 'Graffiti' },
                { time: '2 hours ago', action: 'Status updated', location: 'Bridge District', type: 'Traffic Signal' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type} • {activity.location}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Issues</CardTitle>
            <CardDescription>
              High priority items requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: '#2451', type: 'Water Leak', priority: 'urgent' },
                { id: '#2448', type: 'Road Closure', priority: 'urgent' },
                { id: '#2445', type: 'Power Outage', priority: 'urgent' },
              ].map((issue) => (
                <div key={issue.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{issue.id}</p>
                    <p className="text-xs text-muted-foreground">{issue.type}</p>
                  </div>
                  <Badge 
                    variant="destructive"
                    className="text-xs"
                  >
                    {issue.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;