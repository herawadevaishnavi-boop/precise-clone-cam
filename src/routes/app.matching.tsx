import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { DemoNote, Meter, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, jobs } from "@/data/demo";

export const Route = createFileRoute("/app/matching")({
  head: () => ({
    meta: [
      { title: "AI Job Matching — AgriDrone AI Hub" },
      { name: "description", content: "AI-assisted job recommendations scored on battery, weather, distance and estimated margin." },
      { property: "og:title", content: "AI Job Matching — AgriDrone AI Hub" },
      { property: "og:description", content: "Recommended jobs with match scores and reasoning." },
    ],
  }),
  component: Matching,
});

const factors = [
  "Drone location", "Drone availability", "Battery", "Estimated flight time", "Weather", "Job distance",
  "Acreage", "Mission duration", "Operator availability", "Estimated revenue", "Operating cost", "Maintenance state",
];

function Matching() {
  const ranked = [...jobs].sort((a, b) => b.match - a.match);
  return (
    <>
      <PageHeader
        title="AI Job Matching"
        subtitle="AI-assisted recommendation — not a guaranteed optimal result."
        action={<StatusBadge tone="info"><Bot className="size-3" /> AI-assisted</StatusBadge>}
      />

      <Panel title="Factors considered" description="Weighted signals in the prototype matching model">
        <div className="flex flex-wrap gap-2">
          {factors.map((f) => (
            <span key={f} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">{f}</span>
          ))}
        </div>
      </Panel>

      <Panel title="Recommended jobs">
        <div className="space-y-3">
          {ranked.map((j) => (
            <div key={j.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{j.id}</p>
                  <p className="text-sm font-semibold">{j.title}</p>
                  <p className="text-xs text-muted-foreground">{j.location} · {j.distanceKm} km · est. profit {inr(j.revenue - j.cost)}</p>
                </div>
                <div className="w-40">
                  <p className="text-right font-display text-xl font-semibold">{j.match}%</p>
                  <Meter value={j.match} tone={j.match > 85 ? "success" : j.match > 70 ? "warning" : "danger"} />
                  <p className="mt-1 text-right text-[11px] text-muted-foreground">Match score</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {j.reasons.map((r) => (
                  <li key={r}>✓ {r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <DemoNote>AI-assisted recommendation · prototype estimate on demo data</DemoNote>
      </Panel>
    </>
  );
}
