import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    avgResponseTime: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchStats = async () => {
      // Mock data - replace with actual API call
      const mockStats = {
        totalReports: 1247,
        resolvedReports: 892,
        avgResponseTime: 3.2,
        activeUsers: 156
      };
      
      setStats(mockStats);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.totalReports.toLocaleString(),
      description: 'Total civic issues reported',
      icon: FileText,
      trend: 'up',
      trendValue: '+12%',
      status: 'neutral'
    },
    {
      title: 'Resolved Issues',
      value: stats.resolvedReports.toLocaleString(),
      description: `${Math.round((stats.resolvedReports / stats.totalReports) * 100)}% resolution rate`,
      icon: CheckCircle,
      trend: 'up',
      trendValue: '+8%',
      status: 'positive'
    },
    {
      title: 'Avg Response Time',
      value: `${stats.avgResponseTime} days`,
      description: 'Average time to first response',
      icon: Clock,
      trend: 'down',
      trendValue: '-15%',
      status: 'positive'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      description: 'Users active in last 30 days',
      icon: Users,
      trend: 'up',
      trendValue: '+23%',
      status: 'positive'
    }
  ];

  const getVariantClass = (status) => {
    switch (status) {
      case 'positive': return 'border-civic-green/20 bg-civic-green/5';
      case 'negative': return 'border-status-urgent/20 bg-status-urgent/5';
      default: return '';
    }
  };

  const getIconClass = (status) => {
    switch (status) {
      case 'positive': return 'text-civic-green';
      case 'negative': return 'text-status-urgent';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor civic engagement and issue resolution across your community.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={card.title} className={getVariantClass(card.status)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${getIconClass(card.status)}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
                <div className="flex items-center pt-1">
                  <TrendIcon className={`h-3 w-3 mr-1 ${
                    card.status === 'positive' ? 'text-civic-green' : 'text-status-urgent'
                  }`} />
                  <span className={`text-xs ${
                    card.status === 'positive' ? 'text-civic-green' : 'text-status-urgent'
                  }`}>
                    {card.trendValue}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest civic engagement updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: 'report', desc: 'New pothole reported on Main Street', time: '2 hours ago', urgent: false },
              { type: 'resolved', desc: 'Street light repair completed', time: '4 hours ago', urgent: false },
              { type: 'urgent', desc: 'Water main break reported downtown', time: '6 hours ago', urgent: true },
              { type: 'report', desc: 'Park maintenance request submitted', time: '8 hours ago', urgent: false },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`rounded-full p-1 ${
                  activity.urgent ? 'bg-status-urgent/10' : 'bg-primary/10'
                }`}>
                  {activity.urgent ? (
                    <AlertTriangle className="h-3 w-3 text-status-urgent" />
                  ) : (
                    <Calendar className="h-3 w-3 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.desc}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Priority Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Issues</CardTitle>
            <CardDescription>High-priority items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { priority: 'High', issue: 'Traffic signal malfunction at 5th & Oak', days: 2 },
              { priority: 'High', issue: 'Playground equipment safety concern', days: 1 },
              { priority: 'Medium', issue: 'Sidewalk crack repair needed', days: 5 },
              { priority: 'Medium', issue: 'Public restroom maintenance', days: 3 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.issue}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === 'High' 
                        ? 'bg-status-urgent/10 text-status-urgent' 
                        : 'bg-status-pending/10 text-status-pending'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.days} days old
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;