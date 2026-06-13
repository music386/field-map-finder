import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { orgById, type Project } from "@/lib/fieldmap-data";
import type { Role } from "./RoleSwitcher";
import { MessageSquare } from "lucide-react";

function buildSmsLink(phone: string, body: string) {
  const cleaned = phone.replace(/\s+/g, "");
  // Use both `?body=` (iOS) — Android also accepts it widely.
  return `sms:${cleaned}?body=${encodeURIComponent(body)}`;
}

function actionFor(role: Role, project: Project, orgName: string) {
  const senderLine =
    "\n\n— Sent via FieldMap. Reply to this number with your contact details.";
  if (role === "ngo") {
    return {
      label: "Propose partnership",
      body: `Hi ${orgName}, I'm reaching out from an NGO about your project "${project.title}". We'd like to explore a partnership.${senderLine}`,
    };
  }
  if (role === "donor") {
    const fund = project.needs.funding;
    const amount = fund ? ` (${fund.currency} ${fund.amount.toLocaleString()})` : "";
    return {
      label: "Express funding interest",
      body: `Hi ${orgName}, I'm interested in supporting "${project.title}"${amount}. Could we discuss next steps?${senderLine}`,
    };
  }
  return {
    label: "Contact this RLO",
    body: `Hi ${orgName}, I came across "${project.title}" on FieldMap and would like to connect.${senderLine}`,
  };
}

export function ProjectCard({
  project,
  open,
  onOpenChange,
  role,
  onOrgClick,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  role: Role;
  onOrgClick: (orgId: string) => void;
}) {
  if (!project) return null;
  const org = orgById(project.orgId);
  if (!org) return null;

  const action = actionFor(role, project, org.name);
  const sms = buildSmsLink(org.phone, action.body);

  const typeBadge =
    project.type === "time-bound"
      ? `Time-bound — target: ${new Date(project.targetDate!).toLocaleDateString(undefined, { month: "short", year: "numeric" })}`
      : "Ongoing mission";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="space-y-2">
          <Badge variant="secondary" className="w-fit capitalize">
            {project.category}
          </Badge>
          <SheetTitle className="text-xl leading-snug">
            {project.title}
          </SheetTitle>
          <button
            onClick={() => onOrgClick(org.id)}
            className="w-fit text-left text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            {org.name}
          </button>
          <p className="text-xs text-muted-foreground">
            {project.locationLabel}
          </p>
          <Badge variant="outline" className="w-fit text-xs font-normal">
            {typeBadge}
          </Badge>
        </SheetHeader>

        <div className="space-y-5 px-4 pb-6">
          <p className="text-sm leading-relaxed text-foreground">
            {project.description}
          </p>

          <Separator />

          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              What this project needs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.needs.funding && (
                <Badge variant="default">
                  Funding: {project.needs.funding.currency}{" "}
                  {project.needs.funding.amount.toLocaleString()}
                </Badge>
              )}
              {project.needs.expertise?.map((e) => (
                <Badge key={e} variant="secondary" className="capitalize">
                  Expertise: {e}
                </Badge>
              ))}
              {project.needs.equipment && (
                <Badge variant="secondary">
                  Equipment: {project.needs.equipment}
                </Badge>
              )}
              {project.needs.training && (
                <Badge variant="secondary">
                  Training: {project.needs.training}
                </Badge>
              )}
              {project.needs.partnership && (
                <Badge variant="secondary">Partnership with NGO</Badge>
              )}
            </div>
          </section>

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

          <section className="space-y-1">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Beneficiaries
            </h4>
            <p className="text-sm">{project.beneficiaries} people</p>
          </section>

          {project.photos && project.photos.length > 0 && (
            <section className="grid grid-cols-3 gap-2">
              {project.photos.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover"
                />
              ))}
            </section>
          )}

          <Separator />

          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <a href={sms}>
                <MessageSquare className="mr-2 h-4 w-4" />
                {action.label}
              </a>
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Opens your SMS app. The RLO will reply to your number directly.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
