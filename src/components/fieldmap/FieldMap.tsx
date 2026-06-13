import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Project } from "@/lib/fieldmap-data";
import { orgById } from "@/lib/fieldmap-data";

// Identical pin for every project — no size, color or badge variation by
// funding amount, status, or org size.
const pinIcon = L.divIcon({
  className: "fieldmap-pin",
  html: `<span class="block h-3 w-3 rounded-full bg-[hsl(var(--pin))] ring-2 ring-white shadow-md"></span>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// Neutral cluster icon — count only, no funding or urgency framing.
function clusterIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div class="flex h-9 w-9 items-center justify-center rounded-full bg-card border-2 border-[hsl(var(--pin))] text-[11px] font-medium text-foreground shadow-md">${count}</div>`,
    className: "fieldmap-cluster",
    iconSize: [36, 36],
  });
}

function FlyTo({ project }: { project: Project | null }) {
  const map = useMap();
  useEffect(() => {
    if (project) {
      map.flyTo([project.lat, project.lng], Math.max(map.getZoom(), 7), {
        duration: 0.8,
      });
    }
  }, [project, map]);
  return null;
}

export function FieldMap({
  projects,
  onSelect,
  focused,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
  focused: Project | null;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const center = useMemo<[number, number]>(() => [10, 25], []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={3}
      minZoom={2}
      worldCopyJump
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={clusterIcon}
        showCoverageOnHover={false}
        maxClusterRadius={50}
      >
        {projects.map((p) => {
          const org = orgById(p.orgId);
          return (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={pinIcon}
              eventHandlers={{ click: () => onSelect(p) }}
            >
              <Popup>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {org?.name}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      <FlyTo project={focused} />
    </MapContainer>
  );
}
