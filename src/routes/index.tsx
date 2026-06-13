import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FieldMap } from "@/components/fieldmap/FieldMap";
import {
  defaultFilters,
  Filters,
  type FilterState,
} from "@/components/fieldmap/Filters";
import { ProjectCard } from "@/components/fieldmap/ProjectCard";
import { OrgPanel } from "@/components/fieldmap/OrgPanel";
import { RoleSwitcher, type Role } from "@/components/fieldmap/RoleSwitcher";
import { projects as allProjects, type Project } from "@/lib/fieldmap-data";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldMap — Discover refugee-led projects" },
      {
        name: "description",
        content:
          "Geographic discovery for refugee-led organizations. One map, one set of pins, identical treatment for every project.",
      },
      { property: "og:title", content: "FieldMap" },
      {
        property: "og:description",
        content:
          "Geographic discovery for refugee-led organizations. One map, identical pins, SMS-first contact.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [role, setRole] = useState<Role>("ngo");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selected, setSelected] = useState<Project | null>(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgOpen, setOrgOpen] = useState(false);

  const visible = useMemo(() => {
    return allProjects.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (filters.type !== "both" && p.type !== filters.type) return false;
      if (filters.country !== "all") {
        // crude country match via locationLabel suffix
        if (!p.locationLabel.endsWith(filters.country)) return false;
      }
      if (filters.needs.length > 0) {
        const has = {
          funding: !!p.needs.funding,
          expertise: (p.needs.expertise?.length ?? 0) > 0,
          equipment: !!p.needs.equipment,
          partnership: !!p.needs.partnership,
        };
        if (!filters.needs.every((n) => has[n])) return false;
      }
      return true;
    });
  }, [filters]);

  function openProject(p: Project) {
    setSelected(p);
    setProjectOpen(true);
    setOrgOpen(false);
  }
  function openOrg(id: string) {
    setOrgId(id);
    setOrgOpen(true);
    setProjectOpen(false);
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b bg-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--pin))] text-white">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-none">FieldMap</h1>
            <p className="text-[11px] text-muted-foreground">
              Refugee-led projects, mapped.
            </p>
          </div>
        </div>
        <RoleSwitcher role={role} onChange={setRole} />
      </header>

      <Filters
        value={filters}
        onChange={setFilters}
        resultCount={visible.length}
      />

      <div className="relative flex-1">
        <FieldMap
          projects={visible}
          onSelect={openProject}
          focused={projectOpen ? selected : null}
        />
      </div>

      <ProjectCard
        project={selected}
        open={projectOpen}
        onOpenChange={setProjectOpen}
        role={role}
        onOrgClick={openOrg}
      />
      <OrgPanel
        orgId={orgId}
        open={orgOpen}
        onOpenChange={setOrgOpen}
        onProjectClick={openProject}
      />
    </div>
  );
}
