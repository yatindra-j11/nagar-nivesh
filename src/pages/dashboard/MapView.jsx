import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const MapView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
        <p className="text-muted-foreground">
          Interactive map showing civic issues across the community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Issue Map</CardTitle>
          <CardDescription>
            Geographic view of reported issues and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive map interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;