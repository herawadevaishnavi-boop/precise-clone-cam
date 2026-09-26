import { createFileRoute } from "@tanstack/react-router";
import { DemoNote, Field, Meter, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { drones } from "@/data/demo";

export const Route = createFileRoute("/app/fleet")({
  head: () => ({
    meta: [
      { title: "Drone Fleet — AgriDrone AI Hub" },
      { name: "description", content: "Fleet roster with battery, health, flight hours and maintenance state for every drone." },
      { property: "og:title", content: "Drone Fleet — AgriDrone AI Hub" },
      { property: "og:description", content: "Battery, health, flight hours and maintenance state per drone." },
    ],
  }),
  component: Fleet,
});

function Fleet() {
  return (
    <>
      <PageHeader title="Drone Fleet" subtitle="Demo telemetry across all registered drones." />
      <div className="grid gap-4 lg:grid-cols-3">
        {drones.map((d) => (
          <Panel
            key={d.id}
            title={d.id}
            description={d.model}
            right={<StatusBadge tone={d.status === "READY" ? "success" : d.status === "IN MISSION" ? "info" : "warning"}>{d.status}</StatusBadge>}
          >
            <Meter value={d.battery} tone={d.battery < 30 ? "danger" : d.battery < 60 ? "warning" : "success"} />
            <div className="mt-3">
              <Field label="Battery" value={`${d.battery}%`} />
              <Field label="Battery health" value={`${d.batteryHealth}%`} />
              <Field label="Flight hours" value={d.flightHours} />
              <Field label="Missions" value={d.missions} />
              <Field label="Connection" value={d.connection} />
              <Field label="Maintenance" value={d.maintenance} />
            </div>
            <DemoNote />
          </Panel>
        ))}
      </div>
    </>
  );
}
