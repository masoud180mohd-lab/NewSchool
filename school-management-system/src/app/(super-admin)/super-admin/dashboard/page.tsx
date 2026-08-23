"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard-service";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import type { School } from "@/types";

export default function SuperAdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard", "super-admin-stats"],
    queryFn: () => dashboardService.getSuperAdminStats(),
  });

  const { data: recentSchools } = useQuery<School[]>({
    queryKey: ["dashboard", "recent-schools"],
    queryFn: () => dashboardService.getRecentSchools(),
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Super Admin Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Schools"
            value={stats?.totalSchools ?? 0}
            icon={Building2}
            description="All registered schools"
          />
          <StatCard
            title="Active Schools"
            value={stats?.activeSchools ?? 0}
            icon={CheckCircle}
            description="Currently active"
            trend="up"
          />
          <StatCard
            title="Trial Schools"
            value={stats?.trialSchools ?? 0}
            icon={Clock}
            description="On trial period"
          />
          <StatCard
            title="Suspended Schools"
            value={stats?.suspendedSchools ?? 0}
            icon={XCircle}
            description="Account suspended"
            variant="destructive"
          />
          <StatCard
            title="Monthly Recurring Revenue"
            value={`TZS ${(stats?.monthlyRecurringRevenue ?? 0).toLocaleString()}`}
            icon={TrendingUp}
            description="Recurring revenue"
            trend="up"
          />
        </div>

        {/* Recent Schools Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Schools</CardTitle>
            <CardDescription>Recently registered schools on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSchools?.slice(0, 5).map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.email}</TableCell>
                    <TableCell>
                      <Badge variant={school.subscription?.plan === "premium" ? "default" : "secondary"}>
                        {school.subscription?.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={school.subscription?.status === "active" ? "success" : school.subscription?.status === "suspended" ? "destructive" : "warning"}>
                        {school.subscription?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(school.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
