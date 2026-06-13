import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { orgById, projectsByOrg, type Project } from "@/lib/fieldmap-data";

export function OrgPanel({
  orgId,
  open,
  onOpenChange,
  onProjectClick,
}: {
  orgId: string | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onProjectClick: (p: Project) => void;
}) {
  if (!orgId) return null;
  const org = orgById(orgId);
  if (!org) return null;
  const orgProjects = projectsByOrg(orgId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="space-y-2">
          <Badge variant="outline" className="w-fit capitalize">
            {org.orgType}
          </Badge>
          <SheetTitle className="text-xl leading-snug">{org.name}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {org.region}, {org.country}
          </p>
        </SheetHeader>

        <div className="space-y-5 px-4 pb-6">
          {org.description && (
            <p className="text-sm leading-relaxed">{org.description}</p>
          )}

          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              What this RLO brings
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {org.brings.map((b) => (
                <Badge key={b} variant="outline" className="capitalize">
                  {b}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Projects ({orgProjects.length})
            </h4>
            <ul className="space-y-2">
              {orgProjects.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onProjectClick(p)}
                    className="block w-full rounded-md border bg-card p-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-snug">
                        {p.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px] capitalize"
                      >
                        {p.category}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.locationLabel}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
