import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Ruler, Timer } from "lucide-react";
import { DemoNote, EmptyState, Field, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, jobs as allJobs, type Job } from "@/data/demo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({
    meta: [
      { title: "Job Marketplace — AgriDrone AI Hub" },
      { name: "description", content: "Agricultural and commercial drone jobs with distance, weather suitability and estimated profit." },
      { property: "og:title", content: "Job Marketplace — AgriDrone AI Hub" },
      { property: "og:description", content: "Browse drone jobs with revenue, cost and profit estimates." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const [category, setCategory] = useState<"All" | "Agriculture" | "Commercial">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Job | null>(null);

  const filtered = useMemo(
    () =>
      allJobs.filter(
        (j) =>
          (category === "All" || j.category === category) &&
          (j.title + j.customer + j.location + j.id).toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  return (
    <>
      <PageHeader title="Job Marketplace" subtitle="Demo job board — every financial figure is a prototype estimate." />

      <div className="flex flex-wrap items-center gap-2">
        {(["All", "Agriculture", "Commercial"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
          >
            {c}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search job, customer or location…"
          className="ml-auto w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40 sm:w-72"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No jobs match your filters" description="Try a different category or clear the search to see the full demo job board." icon={MapPin} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((j) => (
            <Panel key={j.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{j.id}</p>
                  <h3 className="mt-1 text-base font-semibold">{j.title}</h3>
                  <p className="text-xs text-muted-foreground">{j.customer} · {j.location}</p>
                </div>
                <StatusBadge tone={j.priority === "High" ? "danger" : j.priority === "Medium" ? "warning" : "neutral"}>{j.priority}</StatusBadge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Ruler className="size-3" />{j.areaAcres} acres</span>
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{j.distanceKm} km</span>
                <span className="inline-flex items-center gap-1"><Timer className="size-3" />{j.durationMin} min</span>
              </div>

              <div className="mt-3">
                <Field label="Job type" value={j.type} />
                <Field label="Required drone" value={j.requiredDrone} />
                <Field label="Battery requirement" value={j.batteryRequirement} />
                <Field
                  label="Weather suitability"
                  value={<StatusBadge tone={j.weather === "Suitable" ? "success" : j.weather === "Caution" ? "warning" : "danger"}>{j.weather}</StatusBadge>}
                />
                <Field label="Estimated revenue" value={inr(j.revenue)} />
                <Field label="Estimated cost" value={inr(j.cost)} />
                <Field label="Estimated profit" value={<span className="text-success">{inr(j.revenue - j.cost)}</span>} />
              </div>

              <button
                onClick={() => setSelected(j)}
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Analyze Mission
              </button>
            </Panel>
          ))}
        </div>
      )}
      <DemoNote />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.id} · Mission analysis</DialogTitle>
          </DialogHeader>
          {selected ? (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">AI-assisted analysis on demo data — prototype estimate, not a guarantee.</p>
              <Field label="Match score" value={`${selected.match}%`} />
              <Field label="Estimated duration" value={`${selected.durationMin} min`} />
              <Field label="Travel distance" value={`${selected.distanceKm} km`} />
              <Field label="Estimated battery use" value={`${Math.min(96, Math.round(selected.durationMin * 1.6))}%`} />
              <Field label="Estimated profit" value={inr(selected.revenue - selected.cost)} />
              <ul className="space-y-1 pt-2 text-xs text-muted-foreground">
                {selected.reasons.map((r) => (
                  <li key={r}>✓ {r}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
