import { lazy, Suspense } from "react";
import type { Project } from "@/lib/fieldmap-data";

const InnerMap = lazy(() =>
  import("./FieldMapInner").then((m) => ({ default: m.FieldMapInner })),
);

export function FieldMap(props: {
  projects: Project[];
  onSelect: (p: Project) => void;
  focused: Project | null;
}) {
  if (typeof window === "undefined") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
          Loading map…
        </div>
      }
    >
      <InnerMap {...props} />
    </Suspense>
  );
}
