import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DemoNote, Field, PageHeader, Panel, StatCard } from "@/components/kit";
import { inr } from "@/data/demo";

export const Route = createFileRoute("/app/optimization")({
  head: () => ({
    meta: [
      { title: "Mission Optimization — AgriDrone AI Hub" },
      { name: "description", content: "Prototype simulation of route, battery and operating cost savings from AI-assisted mission optimization." },
      { property: "og:title", content: "Mission Optimization — AgriDrone AI Hub" },
      { property: "og:description", content: "Before and after route, battery and cost comparison." },
    ],
  }),
  component: Optimization,
});

const factors = ["Distance", "Farm location", "Acreage", "Battery", "Weather", "Job priority", "Travel time", "Operating cost"];

function Optimization() {
  return (
    <>
      <PageHeader title="Mission Optimization" subtitle="Prototype simulation — illustrative savings on demo data." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Distance saved" value="5.7 km" tone="success" hint="18.4 km → 12.7 km" />
        <StatCard label="Battery saved" value="18%" tone="success" hint="72% → 54%" />
        <StatCard label="Estimated savings" value={inr(530)} tone="success" hint="₹1,850 → ₹1,320" />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Panel title="Before optimization">
          <Field label="Distance" value="18.4 km" />
          <Field label="Estimated battery" value="72%" />
          <Field label="Estimated cost" value={inr(1850)} />
          <Field label="Estimated travel time" value="34 min" />
          <Field label="Jobs sequenced" value="4" />
        </Panel>
        <div className="hidden justify-center md:flex"><ArrowRight className="size-6 text-primary" /></div>
        <Panel title="After AI-assisted optimization">
          <Field label="Distance" value="12.7 km" />
          <Field label="Estimated battery" value="54%" />
          <Field label="Estimated cost" value={inr(1320)} />
          <Field label="Estimated travel time" value="23 min" />
          <Field label="Jobs sequenced" value="4" />
        </Panel>
      </div>

      <Panel title="Optimization factors">
        <div className="flex flex-wrap gap-2">
          {factors.map((f) => <span key={f} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">{f}</span>)}
        </div>
        <DemoNote>Prototype simulation · AI-assisted, not a guaranteed optimal route</DemoNote>
      </Panel>
    </>
  );
}
