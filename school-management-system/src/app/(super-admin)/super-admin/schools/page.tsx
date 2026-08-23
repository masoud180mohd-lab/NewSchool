"use client";

import { useQuery } from "@tanstack/react-query";
import { schoolService } from "@/services/school-service";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Plus, Eye } from "lucide-react";
import Link from "next/link";
import type { School } from "@/types";

export default function SchoolsPage() {
  const { data: schools, isLoading } = useQuery<School[]>({
    queryKey: ["schools", "list"],
    queryFn: () => schoolService.getAllSchools(),
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
            <p className="text-muted-foreground">Manage registered schools</p>
          </div>
          <Link href="/super-admin/schools/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add School
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Schools</CardTitle>
            <CardDescription>List of all schools registered on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools?.map((school) => (
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
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Link href={`/super-admin/schools/${school.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
