import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Drone, Tractor, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Demo Login — AgriDrone AI Hub" },
      { name: "description", content: "Choose a demo role to explore the AgriDrone AI Hub prototype: drone operator, farmer or operations admin." },
      { property: "og:title", content: "Demo Login — AgriDrone AI Hub" },
      { property: "og:description", content: "Continue as drone operator, farmer or admin. No real authentication required." },
    ],
  }),
  component: LoginPage,
});

const roles = [
  {
    icon: Drone,
    title: "Drone Operator",
    desc: "Fleet health, job marketplace, mission planning and profitability.",
    to: "/app" as const,
    cta: "Continue as Drone Operator",
  },
  {
    icon: Tractor,
    title: "Farmer",
    desc: "Field condition, crop intelligence, harvest readiness and drone services.",
    to: "/app/farmer" as const,
    cta: "Continue as Farmer",
  },
  {
    icon: ShieldCheck,
    title: "Admin / Operations",
    desc: "Live operations map, analytics and alert centre across the network.",
    to: "/app/operations" as const,
    cta: "Continue as Admin",
  },
];

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="hero-canopy flex min-h-screen items-center justify-center px-4 py-16 text-canopy-foreground">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <Link to="/" className="text-xs tracking-[0.3em] text-canopy-foreground/70 uppercase">
            AgriDrone AI Hub
          </Link>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Choose a demo role</h1>
          <p className="mt-2 text-sm text-canopy-foreground/75">
            Prototype demo login — no real authentication, no credentials stored.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <button
              key={r.title}
              onClick={() => navigate({ to: r.to })}
              className="group rounded-xl border border-white/15 bg-white/5 p-6 text-left transition hover:border-white/35 hover:bg-white/10"
            >
              <r.icon className="size-6 text-accent" />
              <h2 className="mt-4 text-lg font-semibold">{r.title}</h2>
              <p className="mt-1 text-sm text-canopy-foreground/70">{r.desc}</p>
              <span className="mt-5 inline-flex rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground">
                {r.cta}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
