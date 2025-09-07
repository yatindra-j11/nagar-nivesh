import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { Download, Calendar, TrendingUp } from 'lucide-react';

interface IssuesByCategory {
  name: string;
  value: number;
  color: string;
}

interface IssuesOverTime {
  date: string;
  reports: number;
  resolved: number;
}

interface ResponseTimes {
  department: string;
  avgHours: number;
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [issuesByCategory, setIssuesByCategory] = useState<IssuesByCategory[]>([]);
  const [issuesOverTime, setIssuesOverTime] = useState<IssuesOverTime[]>([]);
  const [responseTimes, setResponseTimes] = useState<ResponseTimes[]>([]);

  useEffect(() => {
    // Mock API calls
    const fetchAnalytics = async () => {
      // Issues by category
      setIssuesByCategory([
        { name: 'Potholes', value: 342, color: '#3b82f6' },
        { name: 'Streetlights', value: 234, color: '#22c55e' },
        { name: 'Water Leaks', value: 189, color: '#ef4444' },
        { name: 'Graffiti', value: 156, color: '#f59e0b' },
        { name: 'Traffic Signals', value: 98, color: '#8b5cf6' },
        { name: 'Other', value: 67, color: '#6b7280' },
      ]);

      // Issues over time
      setIssuesOverTime([
        { date: '01/01', reports: 45, resolved: 38 },
        { date: '01/02', reports: 52, resolved: 41 },
        { date: '01/03', reports: 38, resolved: 45 },
        { date: '01/04', reports: 61, resolved: 52 },
        { date: '01/05', reports: 43, resolved: 49 },
        { date: '01/06', reports: 67, resolved: 45 },
        { date: '01/07', reports: 54, resolved: 58 },
        { date: '01/08', reports: 72, resolved: 61 },
        { date: '01/09', reports: 48, resolved: 55 },
        { date: '01/10', reports: 59, resolved: 67 },
        { date: '01/11', reports: 73, resolved: 52 },
        { date: '01/12', reports: 41, resolved: 68 },
        { date: '01/13', reports: 56, resolved: 59 },
        { date: '01/14', reports: 68, resolved: 64 },
      ]);

      // Response times
      setResponseTimes([
        { department: 'Water Dept', avgHours: 2.1 },
        { department: 'Public Works', avgHours: 4.3 },
        { department: 'Electrical', avgHours: 6.7 },
        { department: 'Parks & Rec', avgHours: 8.2 },
        { department: 'Traffic', avgHours: 3.5 },
        { department: 'Maintenance', avgHours: 12.4 },
      ]);
    };

    fetchAnalytics();
  }, [timeRange]);

  const totalIssues = issuesByCategory.reduce((sum, item) => sum + item.value, 0);
  const avgResponseTime = responseTimes.reduce((sum, item) => sum + item.avgHours, 0) / responseTimes.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for civic issue management
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              -0.7h from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citizen Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
            <CardDescription>
              Distribution of reported issues by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issuesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {issuesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time by Department</CardTitle>
            <CardDescription>
              Average hours to first response
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="department" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgHours" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issues Over Time</CardTitle>
          <CardDescription>
            Daily trend of reported vs resolved issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={issuesOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="reports" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Reports Submitted"
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="hsl(var(--civic-green))" 
                strokeWidth={2}
                name="Issues Resolved"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;