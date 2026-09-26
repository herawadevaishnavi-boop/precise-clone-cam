import { createFileRoute } from "@tanstack/react-router";
import { CloudRain, Droplets, Eye, Thermometer, Wind } from "lucide-react";
import { DemoNote, PageHeader, Panel, StatCard, StatusBadge } from "@/components/kit";
import { weatherHours, weatherNow } from "@/data/demo";
import { useScenario } from "@/lib/demo-mode";

export const Route = createFileRoute("/app/weather")({
  head: () => ({
    meta: [
      { title: "Weather Intelligence — AgriDrone AI Hub" },
      { name: "description", content: "Mission suitability windows based on wind, rain probability, temperature and visibility." },
      { property: "og:title", content: "Weather Intelligence — AgriDrone AI Hub" },
      { property: "og:description", content: "Weather windows and mission suitability decision support." },
    ],
  }),
  component: Weather,
});

function Weather() {
  const [scenario] = useScenario();
  const bad = scenario === "WEATHER WARNING";
  const w = bad
    ? { ...weatherNow, rainProbability: 82, windKph: 24, suitability: "NOT RECOMMENDED" as const, recommendation: "Consider postponing weather-sensitive spraying activity." }
    : weatherNow;

  return (
    <>
      <PageHeader title="Weather Intelligence" subtitle="Prototype decision support — demo weather data." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Temperature" value={`${w.temperature}°C`} icon={Thermometer} />
        <StatCard label="Wind speed" value={`${w.windKph} km/h`} icon={Wind} tone={w.windKph > 18 ? "warning" : "neutral"} />
        <StatCard label="Rain probability" value={`${w.rainProbability}%`} icon={CloudRain} tone={w.rainProbability > 50 ? "danger" : "neutral"} />
        <StatCard label="Humidity" value={`${w.humidity}%`} icon={Droplets} />
        <StatCard label="Visibility" value={`${w.visibilityKm} km`} icon={Eye} />
      </div>

      <Panel
        title="Mission suitability"
        description={`Recommended weather window ${w.window}`}
        right={<StatusBadge tone={w.suitability === "SUITABLE" ? "success" : "danger"}>{w.suitability}</StatusBadge>}
      >
        <div className={`rounded-lg p-4 text-sm ${w.suitability === "SUITABLE" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          AI recommendation: {w.recommendation}
        </div>
        <DemoNote>AI-assisted · prototype decision support</DemoNote>
      </Panel>

      <Panel title="Hourly outlook">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-xs text-muted-foreground uppercase">
              <tr><th className="pb-2">Hour</th><th className="pb-2">Wind</th><th className="pb-2">Rain</th><th className="pb-2">Temp</th><th className="pb-2">Suitability</th></tr>
            </thead>
            <tbody>
              {weatherHours.map((h) => (
                <tr key={h.hour} className="border-t border-border">
                  <td className="py-3">{h.hour}</td>
                  <td className="py-3">{h.wind} km/h</td>
                  <td className="py-3">{h.rain}%</td>
                  <td className="py-3">{h.temp}°C</td>
                  <td className="py-3">
                    <StatusBadge tone={h.suitability === "SUITABLE" ? "success" : h.suitability === "CAUTION" ? "warning" : "danger"}>
                      {h.suitability}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DemoNote />
      </Panel>
    </>
  );
}
