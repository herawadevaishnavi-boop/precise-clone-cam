import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DemoNote, Field, PageHeader, Panel } from "@/components/kit";
import { SimMap } from "@/components/SimMap";
import { drones, jobs } from "@/data/demo";

export const Route = createFileRoute("/app/planner")({
  head: () => ({
    meta: [
      { title: "Mission Planner — AgriDrone AI Hub" },
      { name: "description", content: "Plan a drone mission on a simulated field map with distance, battery and duration estimates." },
      { property: "og:title", content: "Mission Planner — AgriDrone AI Hub" },
      { property: "og:description", content: "Simulated map planning with battery and duration estimates." },
    ],
  }),
  component: Planner,
});

function Planner() {
  const [droneId, setDroneId] = useState(drones[0]!.id);
  const [jobId, setJobId] = useState(jobs[0]!.id);
  const [start, setStart] = useState("09:00");

  const drone = drones.find((d) => d.id === droneId)!;
  const job = jobs.find((j) => j.id === jobId)!;
  const battery = Math.min(96, Math.round(job.durationMin * 1.6));

  const select = "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

  return (
    <>
      <PageHeader title="Mission Planner" subtitle="Stylized simulated map — no external map API required." />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Mission setup" className="lg:col-span-1">
          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Drone
              <select className={`mt-1 ${select}`} value={droneId} onChange={(e) => setDroneId(e.target.value)}>
                {drones.map((d) => <option key={d.id}>{d.id}</option>)}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Job
              <select className={`mt-1 ${select}`} value={jobId} onChange={(e) => setJobId(e.target.value)}>
                {jobs.map((j) => <option key={j.id} value={j.id}>{j.id} · {j.title}</option>)}
              </select>
            </label>
            <label className="block text-xs font-medium text-muted-foreground">
              Start time
              <input type="time" className={`mt-1 ${select}`} value={start} onChange={(e) => setStart(e.target.value)} />
            </label>
          </div>

          <div className="mt-4">
            <Field label="Farm / customer" value={job.customer} />
            <Field label="Area" value={`${job.areaAcres} acres`} />
            <Field label="Mission type" value={job.type} />
            <Field label="Distance" value={`${job.distanceKm} km`} />
            <Field label="Estimated travel time" value={`${Math.round(job.distanceKm * 1.8)} min`} />
            <Field label="Estimated battery consumption" value={`${battery}%`} />
            <Field label="Estimated mission duration" value={`${job.durationMin} min`} />
            <Field label="Drone battery available" value={`${drone.battery}%`} />
          </div>

          <div className="mt-4 grid gap-2">
            <button onClick={() => toast.success("Prototype simulation: route optimized")} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
              Optimize Mission
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => toast.success("Demo mission created")} className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold">Create Mission</button>
              <button onClick={() => toast("Plan saved locally in demo mode")} className="rounded-lg border border-input px-4 py-2.5 text-sm font-semibold">Save Plan</button>
            </div>
          </div>
          <DemoNote />
        </Panel>

        <Panel title="Simulated mission map" description="Starting point → farm boundary → mission route → return path" className="lg:col-span-2">
          <SimMap
            height={420}
            route={[{ x: 12, y: 84 }, { x: 28, y: 62 }, job.position, { x: job.position.x + 8, y: job.position.y - 10 }, { x: 12, y: 84 }]}
            markers={[
              { id: "home", x: 12, y: 84, label: "Base", tone: "farm" },
              { id: drone.id, x: drone.location.x, y: drone.location.y, label: drone.id, tone: "drone" },
              { id: job.id, x: job.position.x, y: job.position.y, label: `${job.id} · ${job.location}`, tone: "job" },
            ]}
          />
          <DemoNote>Prototype simulation · illustrative geometry only</DemoNote>
        </Panel>
      </div>
    </>
  );
}
