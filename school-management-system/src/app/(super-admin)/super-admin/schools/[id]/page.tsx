"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { schoolService } from "@/services/school-service";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, Building2, Mail, Phone, MapPin, Shield, AlertCircle, CheckCircle2, PauseCircle, PlayCircle } from "lucide-react";
import Link from "next/link";
import type { School } from "@/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SchoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState<string>("");

  const schoolId = params.id as string;

  const { data: school, isLoading, error } = useQuery<School>({
    queryKey: ["schools", schoolId],
    queryFn: () => schoolService.getSchoolById(schoolId),
  });

  const suspendMutation = useMutation({
    mutationFn: () => schoolService.suspendSchool(schoolId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast.success("School suspended successfully");
      setSuspendDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to suspend school");
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: () => schoolService.reactivateSchool(schoolId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast.success("School reactivated successfully");
    },
    onError: () => {
      toast.error("Failed to reactivate school");
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: (plan: string) => schoolService.updateSchool(schoolId, {
      subscription: { ...school!.subscription!, plan: plan as any }
    } as Partial<School>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast.success("Subscription plan updated successfully");
      setPlanDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update subscription plan");
    },
  });

  if (isLoading) {
    return (
      <AppShell>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </AppShell>
    );
  }

  if (error || !school) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">School not found</h2>
            <p className="text-muted-foreground mt-2">The school you are looking for does not exist.</p>
            <Link href="/super-admin/schools">
              <Button className="mt-4">Back to Schools</Button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const isSuspended = school.subscription?.status === "suspended" || !school.isActive;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/super-admin/schools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{school.name}</h1>
              <p className="text-muted-foreground">School Profile & Management</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isSuspended ? (
              <Button
                variant="outline"
                onClick={() => reactivateMutation.mutate()}
                disabled={reactivateMutation.isPending}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Reactivate School
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setSuspendDialogOpen(true)}
                disabled={suspendMutation.isPending}
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                Suspend School
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">School Code</p>
                  <p className="font-medium">{school.code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={isSuspended ? "destructive" : "success"}>
                    {isSuspended ? "Suspended" : "Active"}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{school.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{school.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <span>{school.address}, {school.city}, {school.country}</span>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p>Created: {new Date(school.createdAt).toLocaleDateString()}</p>
                <p>Last Updated: {new Date(school.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Subscription Details
              </CardTitle>
              <CardDescription>Manage subscription plan and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {school.subscription ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Plan</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={school.subscription.plan === "premium" ? "default" : "secondary"}>
                          {school.subscription.plan.toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNewPlan(school.subscription?.plan || "");
                            setPlanDialogOpen(true);
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Billing Cycle</p>
                      <p className="font-medium capitalize">{school.subscription.billingCycle}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={school.subscription.status === "active" ? "success" : school.subscription.status === "suspended" ? "destructive" : "warning"}>
                        {school.subscription.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">{school.subscription.currency} {school.subscription.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(school.subscription.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(school.subscription.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {school.subscription.trialEndsAt && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Trial Ends</p>
                        <p className="font-medium">{new Date(school.subscription.trialEndsAt).toLocaleDateString()}</p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No subscription found</p>
                  <Button className="mt-4" onClick={() => setPlanDialogOpen(true)}>
                    Add Subscription
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Suspend Dialog */}
        <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suspend School</DialogTitle>
              <DialogDescription>
                Are you sure you want to suspend {school.name}? This will prevent the school from accessing the platform.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => suspendMutation.mutate()}
                disabled={suspendMutation.isPending}
              >
                {suspendMutation.isPending ? "Suspending..." : "Suspend School"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Plan Change Dialog */}
        <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Subscription Plan</DialogTitle>
              <DialogDescription>
                Select a new subscription plan for {school.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={newPlan} onValueChange={setNewPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => updatePlanMutation.mutate(newPlan)}
                disabled={updatePlanMutation.isPending || !newPlan}
              >
                {updatePlanMutation.isPending ? "Updating..." : "Update Plan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
