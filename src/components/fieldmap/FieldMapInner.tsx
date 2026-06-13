import { useEffect, useMemo } from "react";
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

const pinIcon = L.divIcon({
  className: "fieldmap-pin",
  html: `<span style="display:block;height:14px;width:14px;border-radius:9999px;background:hsl(173 80% 30%);box-shadow:0 0 0 2px #fff,0 1px 3px rgba(0,0,0,0.3)"></span>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function clusterIcon(cluster: { getChildCount: () => number }) {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div style="display:flex;align-items:center;justify-content:center;height:36px;width:36px;border-radius:9999px;background:#fff;border:2px solid hsl(173 80% 30%);font:500 11px system-ui;color:#111;box-shadow:0 2px 6px rgba(0,0,0,0.15)">${count}</div>`,
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

export function FieldMapInner({
  projects,
  onSelect,
  focused,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
  focused: Project | null;
}) {
  const center = useMemo<[number, number]>(() => [10, 25], []);
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
        attribution='&copy; OpenStreetMap &copy; CARTO'
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
                <div style={{ fontSize: 12 }}>
                  <strong>{p.title}</strong>
                  <div style={{ color: "#666", fontSize: 11 }}>{org?.name}</div>
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
