import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  label: string;
  tone: "drone" | "job" | "active" | "completed" | "farm" | "maintenance";
}

const toneStyles: Record<MapMarker["tone"], string> = {
  drone: "bg-primary text-primary-foreground",
  job: "bg-accent text-accent-foreground",
  active: "bg-info text-info-foreground",
  completed: "bg-muted text-muted-foreground",
  farm: "bg-success text-success-foreground",
  maintenance: "bg-destructive text-destructive-foreground",
};

/** Stylized simulated operations map — no map API key required. */
export function SimMap({
  markers,
  route,
  height = 380,
  children,
}: {
  markers: MapMarker[];
  route?: { x: number; y: number }[];
  height?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className="surface-grid relative w-full overflow-hidden rounded-xl border border-border bg-secondary/40"
      style={{ height }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute top-[18%] left-[8%] h-24 w-40 rounded-lg bg-success/15" />
        <div className="absolute top-[52%] left-[36%] h-28 w-52 rounded-lg bg-success/20" />
        <div className="absolute top-[24%] right-[12%] h-32 w-40 rounded-lg bg-accent/15" />
      </div>

      {route && route.length > 1 ? (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={route.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}

      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <div className={cn("flex size-3 items-center justify-center rounded-full ring-4 ring-background/70", toneStyles[m.tone])} />
          <span className="mt-1 block -translate-x-1/2 rounded bg-background/85 px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap shadow-sm">
            {m.label}
          </span>
        </div>
      ))}
      {children}
    </div>
  );
}
