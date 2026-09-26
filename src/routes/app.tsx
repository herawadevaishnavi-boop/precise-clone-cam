import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Battery,
  Bell,
  Bot,
  Cloud,
  Cpu,
  Drone,
  Gauge,
  Leaf,
  LayoutDashboard,
  Map,
  Menu,
  Navigation,
  Droplets,
  PiggyBank,
  Route as RouteIcon,
  Scale,
  Search,
  Settings,
  Shapes,
  Sprout,
  Store,
  Tractor,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScenario } from "@/lib/demo-mode";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/fleet", label: "Drone Fleet", icon: Drone },
  { to: "/app/telemetry", label: "Telemetry", icon: Activity },
  { to: "/app/battery", label: "Battery Intelligence", icon: Battery },
  { to: "/app/jobs", label: "Job Marketplace", icon: Search },
  { to: "/app/matching", label: "AI Job Matching", icon: Bot },
  { to: "/app/planner", label: "Mission Planner", icon: Navigation },
  { to: "/app/weather", label: "Weather Intelligence", icon: Cloud },
  { to: "/app/optimization", label: "Mission Optimization", icon: RouteIcon },
  { to: "/app/profitability", label: "Profitability", icon: PiggyBank },
  { to: "/app/simulator", label: "What-If Simulator", icon: Shapes },
  { to: "/app/crop", label: "Crop Intelligence", icon: Leaf },
  { to: "/app/soil", label: "Soil Moisture", icon: Droplets },
  { to: "/app/harvest", label: "Harvest Readiness", icon: Sprout },
  { to: "/app/storage", label: "Storage Intelligence", icon: Store },
  { to: "/app/decision", label: "Sell / Wait / Store", icon: Scale },
  { to: "/app/farmer", label: "Farmer Portal", icon: Tractor },
  { to: "/app/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/app/operations", label: "Live Operations", icon: Map },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/app/hardware", label: "Hardware", icon: Cpu },
  { to: "/app/demo", label: "Demo Mode", icon: Gauge },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

function AppLayout() {
  const [open, setOpen] = useState(false);
  const [scenario] = useScenario();

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Drone className="size-4" />
            </span>
            <span className="font-display text-sm leading-tight font-semibold">
              AgriDrone
              <span className="block text-[10px] font-normal tracking-widest text-sidebar-foreground/60 uppercase">
                AI Hub
              </span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: "exact" in item ? item.exact : false }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-5 py-4 text-[11px] text-sidebar-foreground/60">
          Prototype · demo data only
        </div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu className="size-5" />
          </button>
          <div className="relative hidden flex-1 md:block">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search jobs, drones, fields…"
              className="w-full max-w-sm rounded-lg border border-input bg-card py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/app/demo"
              className="hidden rounded-full bg-accent/20 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase sm:inline-flex"
            >
              Demo: {scenario}
            </Link>
            <Link to="/app/alerts" className="relative" aria-label="Alerts">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                3
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                RK
              </span>
              <span className="hidden text-xs leading-tight sm:block">
                Rohan Kulkarni
                <span className="block text-muted-foreground">Drone Operator</span>
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
