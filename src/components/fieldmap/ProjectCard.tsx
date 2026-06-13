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
import { categoryPhotos, orgColor, orgInitials } from "@/lib/category-photos";
import { deriveSubmission } from "@/lib/submissions";
import type { Role } from "./RoleSwitcher";
import { MessageSquare } from "lucide-react";

function buildSmsLink(phone: string, body: string) {
  const cleaned = phone.replace(/\s+/g, "");
  return `sms:${cleaned}?body=${encodeURIComponent(body)}`;
}

function actionFor(role: Role, project: Project, orgName: string) {
  const senderLine =
    "\n\n— Sent via FieldMap. Reply to this number with your contact details.";
  if (role === "ngo") {
    return {
      label: "Propose partnership",
      body: `Hi ${orgName}, I'm reaching out from an NGO about your initiative "${project.title}". We'd like to explore a partnership.${senderLine}`,
    };
  }
  if (role === "donor") {
    const fund = project.needs.funding;
    const amount = fund
      ? ` (${fund.currency} ${fund.amount.toLocaleString()})`
      : "";
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h4>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
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

  const submission = deriveSubmission(project)!;
  const action = actionFor(role, project, org.name);
  const sms = buildSmsLink(org.phone, action.body);
  const photo = categoryPhotos[project.category];
  const submittedDate = new Date(submission.submitted_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-md">
        <div className="relative h-48 w-full bg-muted">
          <img
            src={photo}
            alt={`${project.category} initiative`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 capitalize"
          >
            {project.category}
          </Badge>
          <Badge
            className="absolute right-3 top-3"
            variant={submission.type === "Project" ? "default" : "outline"}
          >
            {submission.type}
          </Badge>
        </div>

        <div className="flex items-center gap-3 border-b px-4 py-3">
          <button
            onClick={() => onOrgClick(org.id)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: orgColor(org.id) }}
            aria-label={`Open ${org.name}`}
          >
            {orgInitials(org.name)}
          </button>
          <div className="min-w-0">
            <button
              onClick={() => onOrgClick(org.id)}
              className="block truncate text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              {org.name}
            </button>
            <p className="truncate text-xs text-muted-foreground">
              {org.region}, {org.country}
            </p>
          </div>
        </div>

        <SheetHeader className="px-4 pb-2 pt-4 text-left">
          <SheetTitle className="text-xl leading-snug">
            {submission.title}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 px-4 pb-6">
          <Field label="Location">{submission.location}</Field>

          <Field label="The problem this initiative addresses">
            <p className="whitespace-pre-line">
              {submission.description_problem}
            </p>
          </Field>

          <Field label="About the organisation">
            <p className="whitespace-pre-line">{submission.description_org}</p>
          </Field>

          <Separator />

          <section className="space-y-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              What this initiative needs
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

          <section className="space-y-1">
            <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Beneficiaries
            </h4>
            <p className="text-sm">{project.beneficiaries} people</p>
          </section>

          {submission.additional_info && (
            <Field label="Additional info">
              <p className="whitespace-pre-line">
                {submission.additional_info}
              </p>
            </Field>
          )}

          <div className="grid grid-cols-2 gap-3 rounded-md border bg-muted/40 p-3 text-xs">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Contact
              </div>
              <div className="font-medium">{submission.contact}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Preferred language
              </div>
              <div className="font-medium">{submission.preferred_language}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Submitted at
              </div>
              <div className="font-medium">{submittedDate}</div>
            </div>
          </div>

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
