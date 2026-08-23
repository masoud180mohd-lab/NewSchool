"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard-service";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Building2, CheckCircle, DollarSign, TrendingUp, BookOpen } from "lucide-react";

export default function SchoolDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard", "school-stats"],
    queryFn: () => dashboardService.getSchoolStats(),
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
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
          <p className="text-muted-foreground">Welcome to School Administration Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Students"
            value={stats?.totalStudents ?? 0}
            icon={Users}
            description="Enrolled students"
          />
          <StatCard
            title="Total Staff"
            value={stats?.totalStaff ?? 0}
            icon={Building2}
            description="Teaching & non-teaching"
          />
          <StatCard
            title="Attendance Today"
            value={`${stats?.attendanceToday ?? 0}%`}
            icon={CheckCircle}
            description="Student attendance"
            trend="up"
          />
          <StatCard
            title="Fees Collected"
            value={`TZS ${(stats?.feesCollectedThisMonth ?? 0).toLocaleString()}`}
            icon={DollarSign}
            description="This month"
            trend="up"
          />
          <StatCard
            title="Outstanding Fees"
            value={`TZS ${(stats?.outstandingFees ?? 0).toLocaleString()}`}
            icon={TrendingUp}
            description="Pending payments"
            variant="destructive"
          />
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest activities in the school</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>New student enrolled: John Mwangi</TableCell>
                  <TableCell>Admission</TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fee payment received: TZS 150,000</TableCell>
                  <TableCell>Finance</TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Staff meeting scheduled</TableCell>
                  <TableCell>Administration</TableCell>
                  <TableCell>Yesterday</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
