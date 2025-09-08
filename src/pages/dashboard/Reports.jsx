import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          View and manage civic issue reports from community members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Civic Issue Reports</CardTitle>
          <CardDescription>
            Track, manage, and respond to community-reported issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Reports management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;