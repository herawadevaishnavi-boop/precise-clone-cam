import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DemoNote, Field, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { drones, missionDurationSeries, telemetrySeries } from "@/data/demo";

export const Route = createFileRoute("/app/telemetry")({
  head: () => ({
    meta: [
      { title: "Drone Health & Telemetry — AgriDrone AI Hub" },
      { name: "description", content: "Battery, temperature and vibration trends per drone with AI-assisted health status." },
      { property: "og:title", content: "Drone Health & Telemetry — AgriDrone AI Hub" },
      { property: "og:description", content: "Battery, temperature and vibration trends with AI-assisted health status." },
    ],
  }),
  component: Telemetry,
});

const grid = <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />;
const tip = { borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" };

function Telemetry() {
  return (
    <>
      <PageHeader title="Drone Health & Telemetry" subtitle="Demo telemetry — illustrative values, not hardware sensor measurements." />

      <div className="grid gap-4 lg:grid-cols-3">
        {drones.map((d) => (
          <Panel key={d.id} title={d.id} right={<StatusBadge tone={d.status === "READY" ? "success" : "warning"}>{d.status}</StatusBadge>}>
            <Field label="Battery" value={`${d.battery}% (health ${d.batteryHealth}%)`} />
            <Field label="Temperature" value={`${d.temperature}°C`} />
            <Field label="Vibration" value={d.vibration} />
            <Field label="Est. flight time" value={`${d.flightTimeMin} min`} />
            <Field label="Flight hours" value={d.flightHours} />
            <Field label="Missions" value={d.missions} />
            <Field label="Maintenance" value={d.maintenance} />
            <Field label="Connection" value={d.connection} />
            <DemoNote>Demo telemetry</DemoNote>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Battery level over time">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetrySeries}>
                {grid}
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} width={32} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tip} />
                <Line dataKey="battery" stroke="var(--color-chart-1)" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Temperature over time">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetrySeries}>
                {grid}
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} width={32} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tip} />
                <Line dataKey="temperature" stroke="var(--color-chart-5)" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Vibration over time">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetrySeries}>
                {grid}
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} width={32} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tip} />
                <Line dataKey="vibration" stroke="var(--color-chart-2)" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Mission duration & battery consumption">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={missionDurationSeries}>
                {grid}
                <XAxis dataKey="name" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} width={32} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={tip} />
                <Bar dataKey="duration" fill="var(--color-chart-1)" radius={4} />
                <Bar dataKey="consumption" fill="var(--color-chart-2)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <DemoNote />
        </Panel>
      </div>
    </>
  );
}
