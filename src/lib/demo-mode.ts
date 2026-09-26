import { useSyncExternalStore } from "react";

export type Scenario =
  | "NORMAL OPERATION"
  | "LOW BATTERY"
  | "WEATHER WARNING"
  | "MAINTENANCE ALERT"
  | "NEW HIGH-VALUE JOB"
  | "DRONE UNAVAILABLE"
  | "CROP STRESS"
  | "HARVEST READY";

export const scenarios: { key: Scenario; description: string }[] = [
  { key: "NORMAL OPERATION", description: "All drones healthy, weather suitable, standard job board." },
  { key: "LOW BATTERY", description: "DRONE-01 drops to 19% — mission reserve breached." },
  { key: "WEATHER WARNING", description: "Rain probability 82%, spraying not recommended." },
  { key: "MAINTENANCE ALERT", description: "Vibration spike on DRONE-02, inspection recommended." },
  { key: "NEW HIGH-VALUE JOB", description: "An urgent ₹9,200 damage assessment appears nearby." },
  { key: "DRONE UNAVAILABLE", description: "DRONE-02 goes offline mid-schedule; jobs reassigned." },
  { key: "CROP STRESS", description: "FIELD-07 shows elevated water stress and attention zones." },
  { key: "HARVEST READY", description: "Tomato crop enters a 3–5 day harvest window." },
];

let current: Scenario = "NORMAL OPERATION";
const listeners = new Set<() => void>();

export function setScenario(s: Scenario) {
  current = s;
  listeners.forEach((l) => l());
}

export function getScenario() {
  return current;
}

export function useScenario(): [Scenario, (s: Scenario) => void] {
  const value = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "NORMAL OPERATION" as Scenario,
  );
  return [value, setScenario];
}
