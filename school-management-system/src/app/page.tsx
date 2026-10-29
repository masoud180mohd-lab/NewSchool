import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/lib/config";

export default function Home() {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-semibold tracking-wide text-primary">
        Rebuild / Phase 1
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {appConfig.name}
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        Project safety, setup, and foundation. School management modules will be
        added in later phases.
      </p>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Foundation ready</CardTitle>
          <CardDescription>
            The application scaffold and shared UI primitives are in place. See
            the project README and docs folder for setup and Git backup
            instructions. Commit and push your work before the next phase.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
