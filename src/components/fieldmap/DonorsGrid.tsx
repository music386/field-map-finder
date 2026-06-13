import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { donors } from "@/lib/donors-data";
import { orgColor, orgInitials } from "@/lib/category-photos";
import { Mail, MapPin, Target, Globe2 } from "lucide-react";

const typeColor: Record<string, string> = {
  Foundation: "bg-[hsl(212_85%_48%)] text-white hover:bg-[hsl(212_85%_44%)]",
  Government: "bg-[hsl(262_60%_50%)] text-white hover:bg-[hsl(262_60%_46%)]",
  Corporate: "bg-[hsl(28_85%_50%)] text-white hover:bg-[hsl(28_85%_46%)]",
  Individual: "bg-[hsl(152_65%_36%)] text-white hover:bg-[hsl(152_65%_32%)]",
};

export function DonorsGrid() {
  return (
    <div className="h-full w-full overflow-y-auto bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Top donors</h2>
          <p className="text-sm text-muted-foreground">
            A curated list of funders actively supporting refugee-led and humanitarian
            initiatives. Reach out directly to the ones whose interests align with your work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {donors.map((d) => (
            <Card key={d.id} className="flex flex-col">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: orgColor(d.id) }}
                  >
                    {orgInitials(d.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold leading-tight">
                        {d.name}
                      </h3>
                      <Badge className={typeColor[d.type]}>{d.type}</Badge>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {d.location}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                <p className="text-xs leading-relaxed text-foreground/80">{d.about}</p>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <Target className="h-3 w-3" /> Interests
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.interests.map((i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="capitalize text-[10px]"
                      >
                        {i}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <Globe2 className="h-3 w-3" /> Regions
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.regions.map((r) => (
                      <Badge key={r} variant="outline" className="text-[10px]">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-md border bg-muted/40 p-2 text-[11px]">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Ticket size
                    </div>
                    <div className="font-medium">{d.ticketSize}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Recently funded
                    </div>
                    <div className="font-medium">{d.recentlyFunded} initiatives</div>
                  </div>
                </div>

                <Button asChild size="sm" className="mt-auto w-full">
                  <a
                    href={
                      d.contact.includes("@")
                        ? `mailto:${d.contact}?subject=${encodeURIComponent(
                            "Partnership enquiry via FieldMap",
                          )}`
                        : "#"
                    }
                  >
                    <Mail className="mr-1.5 h-3.5 w-3.5" />
                    Contact donor
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
