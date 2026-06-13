import { Badge } from "@/components/ui/badge";
import {
  orgById,
  orgKind,
  projects as allProjects,
  type Project,
} from "@/lib/fieldmap-data";
import { orgColor, orgInitials } from "@/lib/category-photos";
import { SidePanel } from "./SidePanel";

export function PartnershipsPanel({
  open,
  onOpenChange,
  onProjectClick,
  onOrgClick,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onProjectClick: (p: Project, perspectiveOrgId?: string) => void;
  onOrgClick: (orgId: string) => void;
}) {
  const partnerships = allProjects.filter(
    (p) => (p.partnerOrgIds?.length ?? 0) > 0,
  );

  return (
    <SidePanel open={open} onClose={() => onOpenChange(false)}>
      <div className="space-y-4 p-4 pt-5">
        <div className="pr-8">
          <h2 className="text-xl font-semibold leading-snug">
            Recent partnerships
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Initiatives delivered through collaborations sparked on FieldMap.
            {" "}
            {partnerships.length} active{" "}
            {partnerships.length === 1 ? "partnership" : "partnerships"}.
          </p>
        </div>

        <ul className="space-y-3">
          {partnerships.map((p) => {
            const lead = orgById(p.orgId);
            const partners = (p.partnerOrgIds ?? [])
              .map((id) => orgById(id))
              .filter((o): o is NonNullable<typeof o> => !!o);
            if (!lead) return null;
            return (
              <li
                key={p.id}
                className="rounded-md border bg-card p-3 text-left"
              >
                <button
                  onClick={() => onProjectClick(p)}
                  className="block w-full text-left"
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

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-2">
                  {[lead, ...partners].map((o, i) => {
                    const kind = orgKind(o);
                    return (
                      <div key={o.id} className="flex items-center gap-2">
                        {i > 0 && (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(212_85%_48%)]">
                            +
                          </span>
                        )}
                        <button
                          onClick={() => onOrgClick(o.id)}
                          className="flex items-center gap-1.5"
                        >
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                            style={{ backgroundColor: orgColor(o.id) }}
                          >
                            {orgInitials(o.name)}
                          </span>
                          <span className="text-[11px] font-medium text-primary underline-offset-2 hover:underline">
                            {o.name}
                          </span>
                          <Badge
                            className={
                              "text-[9px] " +
                              (kind === "NGO"
                                ? "bg-[hsl(212_85%_48%)] text-white hover:bg-[hsl(212_85%_44%)]"
                                : "bg-[hsl(152_65%_36%)] text-white hover:bg-[hsl(152_65%_32%)]")
                            }
                          >
                            {kind}
                          </Badge>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SidePanel>
  );
}
