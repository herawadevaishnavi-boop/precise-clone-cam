import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { DemoNote, Field, Meter, PageHeader, Panel, StatCard, StatusBadge } from "@/components/kit";
import { drones } from "@/data/demo";
import { useScenario } from "@/lib/demo-mode";

export const Route = createFileRoute("/app/battery")({
  head: () => ({
    meta: [
      { title: "Battery Intelligence — AgriDrone AI Hub" },
      { name: "description", content: "Battery health, degradation, safety reserve and AI-assisted mission duration guidance." },
      { property: "og:title", content: "Battery Intelligence — AgriDrone AI Hub" },
      { property: "og:description", content: "Health, degradation, reserve and recommended mission duration." },
    ],
  }),
  component: BatteryPage,
});

const warnings = ["Low Battery", "Critical Battery", "High Temperature", "Battery Degradation", "Insufficient Mission Reserve"];

function BatteryPage() {
  const [scenario] = useScenario();
  const low = scenario === "LOW BATTERY";
  const battery = low ? 19 : 82;
  const flight = low ? 4 : 16;
  const recommended = Math.max(0, flight - 5);

  return (
    <>
      <PageHeader title="Battery Intelligence" subtitle="AI-assisted decision support on demo battery telemetry." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current battery" value={`${battery}%`} tone={low ? "danger" : "success"} />
        <StatCard label="Estimated flight time" value={`${flight} min`} />
        <StatCard label="Recommended mission duration" value={`${recommended} min`} tone="info" />
        <StatCard label="Safety reserve" value="5 min" tone="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="DRONE-01 battery detail">
          <Meter value={battery} tone={low ? "danger" : "success"} />
          <div className="mt-3">
            <Field label="Battery health" value="94%" />
            <Field label="Battery temperature" value="34.1°C" />
            <Field label="Charging status" value={low ? "Charging" : "Idle"} />
            <Field label="Charge cycles" value="212" />
            <Field label="Estimated degradation" value="6% vs new" />
            <Field label="Recommended reserve" value="5 min" />
          </div>
          <div className={`mt-4 rounded-lg p-3 text-sm ${low ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
            AI recommendation:{" "}
            {low
              ? "Battery below mission reserve — charge before accepting a mission or reassign to DRONE-03."
              : "Battery condition is suitable for a nearby mission."}
          </div>
          <DemoNote>AI-assisted · prototype estimate</DemoNote>
        </Panel>

        <Panel title="Warning states" description="Conditions monitored by the battery engine">
          <div className="space-y-2">
            {warnings.map((w, i) => {
              const active = low && (i === 0 || i === 4);
              return (
                <div key={w} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className={`size-4 ${active ? "text-destructive" : "text-muted-foreground"}`} />
                    {w}
                  </span>
                  <StatusBadge tone={active ? "danger" : "success"}>{active ? "Triggered" : "Clear"}</StatusBadge>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel title="Fleet battery overview">
        <div className="grid gap-4 sm:grid-cols-3">
          {drones.map((d) => (
            <div key={d.id} className="rounded-lg border border-border p-4">
              <p className="text-sm font-medium">{d.id}</p>
              <p className="font-display text-2xl font-semibold">{d.battery}%</p>
              <Meter value={d.battery} tone={d.battery < 30 ? "danger" : d.battery < 60 ? "warning" : "success"} />
              <p className="mt-2 text-xs text-muted-foreground">{d.chargeCycles} cycles · health {d.batteryHealth}%</p>
            </div>
          ))}
        </div>
        <DemoNote />
      </Panel>
    </>
  );
}
