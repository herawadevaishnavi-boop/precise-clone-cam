import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Battery, Briefcase, Drone as DroneIcon, PiggyBank, Rocket, TrendingDown, TrendingUp, Wrench } from "lucide-react";
import { DemoNote, Field, Meter, PageHeader, Panel, StatCard, StatusBadge } from "@/components/kit";
import { activeMissions, alerts, drones, inr, jobs, telemetrySeries } from "@/data/demo";
import { useScenario } from "@/lib/demo-mode";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Operator Overview — AgriDrone AI Hub" },
      { name: "description", content: "Fleet availability, active missions, job pipeline and estimated daily profit for your drone operation." },
      { property: "og:title", content: "Operator Overview — AgriDrone AI Hub" },
      { property: "og:description", content: "Fleet, missions, jobs and estimated daily profit in one operator workspace." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const [scenario] = useScenario();
  const lowBattery = scenario === "LOW BATTERY";
  const droneDown = scenario === "DRONE UNAVAILABLE";

  const fleet = drones.map((d) =>
    lowBattery && d.id === "DRONE-01"
      ? { ...d, battery: 19, flightTimeMin: 4, status: "ATTENTION REQUIRED" as const }
      : droneDown && d.id === "DRONE-02"
        ? { ...d, status: "UNAVAILABLE" as const, connection: "OFFLINE" as const }
        : d,
  );

  const available = fleet.filter((d) => d.status === "READY").length;
  const revenue = jobs.slice(0, 5).reduce((s, j) => s + j.revenue, 0);
  const cost = jobs.slice(0, 5).reduce((s, j) => s + j.cost, 0);
  const lead = fleet[0]!;

  return (
    <>
      <PageHeader
        title="Good morning, Operator"
        subtitle="More Jobs. Smarter Missions. Better Crop Decisions. — all figures below are prototype estimates on demo data."
        action={
          <Link to="/app/matching" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Rocket className="size-4" /> Plan today's missions
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Available drones" value={`${available} / ${fleet.length}`} icon={DroneIcon} tone="success" hint="Ready to fly now" />
        <StatCard label="Active missions" value={String(activeMissions.length)} icon={Rocket} tone="info" hint="In progress today" />
        <StatCard label="Available jobs" value={String(jobs.length)} icon={Briefcase} tone="accent" hint="Within 25 km" />
        <StatCard label="Estimated revenue" value={inr(revenue)} icon={TrendingUp} tone="success" hint="Top 5 matched jobs" />
        <StatCard label="Estimated cost" value={inr(cost)} icon={TrendingDown} tone="warning" hint="Travel, energy, pilot" />
        <StatCard label="Estimated profit" value={inr(revenue - cost)} icon={PiggyBank} tone="success" hint={`Margin ${(((revenue - cost) / revenue) * 100).toFixed(1)}%`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title={`Live telemetry · ${lead.id}`}
          description="Demo telemetry — not a hardware sensor measurement"
          right={<StatusBadge tone={lead.status === "READY" ? "success" : "warning"}>{lead.status}</StatusBadge>}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Battery</p>
              <p className="font-display text-3xl font-semibold">{lead.battery}%</p>
              <div className="mt-2"><Meter value={lead.battery} tone={lead.battery < 30 ? "danger" : "success"} /></div>
            </div>
            <div className="space-y-1">
              <Field label="Temperature" value={`${lead.temperature}°C`} />
              <Field label="Vibration" value={lead.vibration} />
              <Field label="Est. flight time" value={`${lead.flightTimeMin} min`} />
              <Field label="Connection" value={<StatusBadge tone={lead.connection === "ONLINE" ? "success" : "danger"}>{lead.connection}</StatusBadge>} />
            </div>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetrySeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" width={30} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Area dataKey="battery" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <DemoNote />
        </Panel>

        <Panel title="Fleet health" description="Battery health across the fleet">
          <div className="space-y-4">
            {fleet.map((d) => (
              <div key={d.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{d.id}</span>
                  <span className="text-muted-foreground">{d.battery}% · health {d.batteryHealth}%</span>
                </div>
                <div className="mt-2"><Meter value={d.battery} tone={d.battery < 30 ? "danger" : d.battery < 60 ? "warning" : "success"} /></div>
                <p className="mt-1 text-[11px] text-muted-foreground">{d.status} · {d.maintenance}</p>
              </div>
            ))}
          </div>
          <DemoNote>Demo telemetry · AI-assisted health status</DemoNote>
        </Panel>

        <Panel title="Maintenance & alerts" description="Signals requiring operator attention">
          <div className="space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge tone={a.severity === "Critical" ? "danger" : a.severity === "Warning" ? "warning" : "info"}>
                    {a.severity}
                  </StatusBadge>
                  <span className="text-[11px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{a.title}</p>
              </div>
            ))}
          </div>
          <Link to="/app/alerts" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Wrench className="size-4" /> Open alert centre
          </Link>
        </Panel>
      </div>

      <Panel title="Active missions" description="Prototype mission tracking on demo data">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="pb-2">Mission</th><th className="pb-2">Job</th><th className="pb-2">Drone</th>
                <th className="pb-2">Field</th><th className="pb-2">Progress</th><th className="pb-2">ETA</th>
              </tr>
            </thead>
            <tbody>
              {activeMissions.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="py-3 font-mono text-xs">{m.id}</td>
                  <td className="py-3">{m.job}</td>
                  <td className="py-3">{m.drone}</td>
                  <td className="py-3">{m.field}</td>
                  <td className="py-3 w-40"><Meter value={m.progress} /></td>
                  <td className="py-3">{m.etaMin} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Today's workflow" description="Find job → analyze → weather → drone → battery → crop → optimize → profit">
        <div className="flex flex-wrap gap-2 text-xs">
          {["Find job", "Analyze job", "Check weather", "Check drone", "Check battery", "Analyze crop", "Optimize mission", "Estimate cost", "Estimate profit", "Execute", "Monitor", "Harvest readiness", "Store / sell / wait"].map((s, i) => (
            <span key={s} className="rounded-full bg-secondary px-3 py-1.5 font-medium">
              <span className="mr-1.5 font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Battery className="size-4" /> Battery reserve policy: 5 min safety reserve applied to every estimate.
        </div>
      </Panel>
    </>
  );
}
