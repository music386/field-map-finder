import { useEffect, useMemo, useState } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Project, EntityKind } from "@/lib/fieldmap-data";
import { orgById, orgKind } from "@/lib/fieldmap-data";

const PIN_COLORS: Record<EntityKind, string> = {
  RLO: "hsl(152 65% 36%)",
  NGO: "hsl(212 85% 48%)",
};

function makePinIcon(kind: EntityKind, partner = false) {
  const color = PIN_COLORS[kind];
  const ring = partner
    ? "0 0 0 2px #fff,0 0 0 4px " + color + ",0 1px 3px rgba(0,0,0,0.3)"
    : "0 0 0 2px #fff,0 1px 3px rgba(0,0,0,0.3)";
  return L.divIcon({
    className: `fieldmap-pin fieldmap-pin-${kind}`,
    html: `<span style="display:block;height:14px;width:14px;border-radius:9999px;background:${color};box-shadow:${ring}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const icons = {
  RLO: makePinIcon("RLO"),
  NGO: makePinIcon("NGO"),
  "RLO-partner": makePinIcon("RLO", true),
  "NGO-partner": makePinIcon("NGO", true),
};

function clusterIcon(cluster: { getAllChildMarkers: () => L.Marker[] }) {
  const markers = cluster.getAllChildMarkers();
  let rlo = 0;
  let ngo = 0;
  for (const m of markers) {
    const cn =
      (m.options.icon as L.DivIcon | undefined)?.options?.className ?? "";
    if (cn.includes("pin-NGO")) ngo++;
    else rlo++;
  }
  const count = markers.length;
  const green = PIN_COLORS.RLO;
  const blue = PIN_COLORS.NGO;
  let bg: string;
  if (rlo > 0 && ngo > 0) {
    bg = `conic-gradient(${green} 0 50%, ${blue} 50% 100%)`;
  } else if (ngo > 0) {
    bg = blue;
  } else {
    bg = green;
  }
  return L.divIcon({
    html: `<div style="position:relative;height:36px;width:36px;border-radius:9999px;background:${bg};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;"><span style="background:#fff;border-radius:9999px;height:22px;width:22px;display:flex;align-items:center;justify-content:center;font:600 11px system-ui;color:#111;">${count}</span></div>`,
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

// Small deterministic offset so overlapping partner pins are both visible
// at high zoom (they still cluster when zoomed out).
function offsetFor(seed: string, index: number): [number, number] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  const angle = ((h % 360) + index * 137) * (Math.PI / 180);
  const r = 0.012; // ~1.3km
  return [Math.sin(angle) * r, Math.cos(angle) * r];
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

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      const org = orgById(p.orgId);
      if (!org) continue;
      // Normalize a few country aliases to match the GeoJSON `name` field.
      const name = org.country === "Türkiye" ? "Turkey" : org.country;
      counts[name] = (counts[name] ?? 0) + 1;
    }
    return counts;
  }, [projects]);

  const maxCount = Math.max(1, ...Object.values(countryCounts));

  const [countries, setCountries] =
    useState<FeatureCollection<Geometry> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
    )
      .then((r) => r.json())
      .then((data: FeatureCollection<Geometry>) => {
        if (!cancelled) setCountries(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function styleFor(feature?: Feature<Geometry>) {
    const name = (feature?.properties as { name?: string } | undefined)?.name;
    const c = (name && countryCounts[name]) || 0;
    if (!c) {
      // Neutral land fill so highlighted countries don't look like overlays
      return {
        fillColor: "hsl(40 20% 92%)",
        fillOpacity: 1,
        color: "hsl(40 10% 75%)",
        weight: 0.5,
      };
    }
    const t = c / maxCount;
    const lightness = 72 - t * 32; // 72% -> 40%
    return {
      fillColor: `hsl(152 65% ${lightness}%)`,
      fillOpacity: 1,
      color: "hsl(152 65% 25%)",
      weight: 0.8,
    };
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
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
      />

      {countries && (
        <GeoJSON
          key={Object.entries(countryCounts)
            .map(([k, v]) => `${k}:${v}`)
            .join("|")}
          data={countries}
          style={styleFor as L.StyleFunction}
          onEachFeature={(feature, layer) => {
            const name = (feature.properties as { name?: string } | undefined)
              ?.name;
            const c = (name && countryCounts[name]) || 0;
            if (c > 0) {
              layer.bindTooltip(
                `${name}: ${c} initiative${c === 1 ? "" : "s"}`,
                { sticky: true },
              );
            }
          }}
        />
      )}
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={clusterIcon}
        showCoverageOnHover={false}
        maxClusterRadius={50}
      >
        {projects.flatMap((p) => {
          const org = orgById(p.orgId);
          const kind = orgKind(org);
          const partnerOrgs = (p.partnerOrgIds ?? [])
            .map((id) => orgById(id))
            .filter((o): o is NonNullable<typeof o> => !!o);
          const partnerLabel = partnerOrgs.length
            ? ` · with ${partnerOrgs.map((o) => o.name).join(", ")}`
            : "";

          const main = (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={icons[kind]}
              eventHandlers={{ click: () => onSelect(p) }}
            >
              <Popup>
                <div style={{ fontSize: 12 }}>
                  <strong>{p.title}</strong>
                  <div style={{ color: "#666", fontSize: 11 }}>
                    {org?.name} · {kind}
                    {partnerLabel}
                  </div>
                </div>
              </Popup>
            </Marker>
          );

          const partnerPins = partnerOrgs.map((po, i) => {
            const pKind = orgKind(po);
            const [dlat, dlng] = offsetFor(p.id + po.id, i);
            return (
              <Marker
                key={`${p.id}-partner-${po.id}`}
                position={[p.lat + dlat, p.lng + dlng]}
                icon={icons[`${pKind}-partner` as const]}
                eventHandlers={{ click: () => onSelect(p) }}
              >
                <Popup>
                  <div style={{ fontSize: 12 }}>
                    <strong>{po.name}</strong>
                    <div style={{ color: "#666", fontSize: 11 }}>
                      {pKind} · partner on "{p.title}"
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          });

          return [main, ...partnerPins];
        })}
      </MarkerClusterGroup>
      <FlyTo project={focused} />
    </MapContainer>
  );
}
