import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down";
  variant?: "default" | "destructive";
}

export function StatCard({ title, value, description, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <Card className={variant === "destructive" ? "border-destructive/50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${variant === "destructive" ? "text-destructive" : "text-muted-foreground"}`} />}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${variant === "destructive" ? "text-destructive" : ""}`}>{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"} mt-1`}>
            {trend === "up" ? "+" : "-"}5% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
