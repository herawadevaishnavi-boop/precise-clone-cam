import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  Bot,
  Cloud,
  Drone,
  Leaf,
  LineChart,
  MapPinned,
  PiggyBank,
  Route as RouteIcon,
  Scale,
  Sprout,
} from "lucide-react";
import heroImg from "@/assets/hero-drone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriDrone AI Hub — More Jobs. Smarter Missions. Better Crop Decisions." },
      {
        name: "description",
        content:
          "An AI-powered operating layer that helps drone operators find profitable work, plan smarter missions, monitor drone health and turn aerial intelligence into better agricultural decisions.",
      },
      { property: "og:title", content: "AgriDrone AI Hub" },
      {
        property: "og:description",
        content: "AI operating layer connecting drone operators, farmers, missions, weather, battery intelligence and agricultural decision support.",
      },
    ],
  }),
  component: Landing,
});

const flow = [
  { label: "Drone", icon: Drone },
  { label: "AI", icon: Bot },
  { label: "Weather", icon: Cloud },
  { label: "Battery", icon: BatteryCharging },
  { label: "Mission", icon: RouteIcon },
  { label: "Profit", icon: PiggyBank },
  { label: "Crop Intelligence", icon: Leaf },
];

const features = [
  { icon: MapPinned, title: "Job Marketplace", desc: "Agricultural and commercial drone work with distance, weather and profit estimates on every card." },
  { icon: Bot, title: "AI Job Matching", desc: "AI-assisted recommendations scored on battery, weather, distance and estimated margin." },
  { icon: BatteryCharging, title: "Battery Intelligence", desc: "Health, degradation, reserve planning and safe mission duration guidance." },
  { icon: Cloud, title: "Weather Intelligence", desc: "Mission suitability windows for wind, rain probability, temperature and visibility." },
  { icon: RouteIcon, title: "Mission Optimization", desc: "Prototype simulation of route, battery and cost savings before you fly." },
  { icon: Leaf, title: "Crop Intelligence", desc: "AI-assisted visual assessment of vigor, stress and attention zones from aerial imagery." },
  { icon: Sprout, title: "Harvest Readiness", desc: "AI-assisted prototype estimate of the likely harvest window." },
  { icon: Scale, title: "Sell / Wait / Store", desc: "Decision support combining price, shelf-life, storage cost and spoilage risk." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Drone className="size-4" />
            </span>
            <span className="font-display text-sm font-semibold">AgriDrone AI Hub</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#problem" className="hover:text-foreground">Problem</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#business" className="hover:text-foreground">Business</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
              Sign in
            </Link>
            <Link to="/app" className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Launch Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-canopy relative overflow-hidden text-canopy-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase">
              AI operating layer · prototype
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight font-semibold sm:text-5xl">AGRIDRONE AI HUB</h1>
            <p className="mt-3 text-lg text-accent">“More Jobs. Smarter Missions. Better Crop Decisions.”</p>
            <p className="mt-5 max-w-xl text-canopy-foreground/80">
              An AI-powered operating layer that helps drone operators find profitable work, plan smarter missions,
              monitor drone health and turn aerial intelligence into better agricultural decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground">
                Explore Platform <ArrowRight className="size-4" />
              </Link>
              <Link to="/login" className="rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                Launch Demo
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Survey drone flying over terraced farmland at sunrise"
              width={1600}
              height={1008}
              className="w-full rounded-2xl border border-white/15 object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Value chain */}
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-4">
            {flow.map((f, i) => (
              <div key={f.label} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium">
                  <f.icon className="size-4 text-accent" />
                  {f.label}
                </span>
                {i < flow.length - 1 ? <ArrowRight className="size-3.5 text-white/40" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="problem" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">The problem</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                "Drone operators own capable hardware but struggle to find consistent, profitable work.",
                "Missions are planned by intuition — battery, weather and travel cost are guessed.",
                "Unplanned maintenance and battery degradation quietly destroy margins.",
                "Farmers receive raw imagery instead of decisions they can act on.",
              ].map((t) => (
                <li key={t} className="panel p-4">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">The solution</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              AgriDrone AI Hub is not another drone. It is the software layer above the fleet: a marketplace, a mission
              brain and an agricultural decision-support engine in one workspace.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Find more profitable jobs", "Plan missions around battery & weather", "Predictive maintenance signals", "Aerial crop intelligence for farmers"].map((t) => (
                <div key={t} className="panel p-4 text-sm font-medium">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "Discover", d: "AI-assisted matching surfaces nearby jobs your fleet can actually fly today." },
              { n: "02", t: "Decide", d: "Weather, battery reserve and cost models estimate mission feasibility and profit." },
              { n: "03", t: "Fly", d: "Optimized routes, live telemetry and maintenance signals during execution." },
              { n: "04", t: "Advise", d: "Aerial imagery becomes crop, harvest and sell/wait/store decision support." },
            ].map((s) => (
              <div key={s.n} className="panel p-5">
                <span className="font-mono text-xs text-accent">{s.n}</span>
                <h3 className="mt-2 text-base font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-semibold">Key features</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="panel p-5">
              <f.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-6">
            <h3 className="text-lg font-semibold">For drone operators</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· A live job board with revenue, cost and profit estimates</li>
              <li>· Battery and maintenance intelligence that protects uptime</li>
              <li>· What-if simulation when a drone or the weather drops out</li>
              <li>· Utilization and profitability analytics per drone and per day</li>
            </ul>
            <Link to="/app" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Open operator workspace <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="panel p-6">
            <h3 className="text-lg font-semibold">For farmers</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Field-level crop condition and water-stress indications</li>
              <li>· AI-assisted harvest readiness windows</li>
              <li>· Storage and shelf-life guidance</li>
              <li>· Sell / wait / store decision support</li>
            </ul>
            <Link to="/app/farmer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Open farmer portal <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Business model + roadmap */}
      <section id="business" className="border-t border-border bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Business model</h2>
            <div className="mt-6 space-y-3">
              {[
                { t: "Operator SaaS", d: "Monthly subscription per active drone for planning, telemetry and analytics." },
                { t: "Marketplace commission", d: "Small percentage on jobs matched and completed through the hub." },
                { t: "Farmer intelligence plans", d: "Per-acre crop monitoring and decision-support packages." },
                { t: "Enterprise / agri-business", d: "Fleet-wide operations, insurance and co-operative deployments." },
              ].map((b) => (
                <div key={b.t} className="panel p-4">
                  <p className="text-sm font-semibold">{b.t}</p>
                  <p className="text-xs text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Future roadmap</h2>
            <ol className="mt-6 space-y-3 border-l border-border pl-5 text-sm">
              {[
                "Live ESP8266 → FastAPI telemetry ingestion replacing demo data",
                "Model-backed crop scoring validated with field agronomists",
                "Automated multi-drone scheduling across operator networks",
                "Market price feeds for sell / wait / store guidance",
                "Insurance-grade damage assessment reporting",
              ].map((r) => (
                <li key={r} className="relative">
                  <span className="absolute top-1.5 -left-[23px] size-2 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          The AI operating layer connecting operators, farmers and every mission in between
        </h2>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/app" className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Explore Platform
          </Link>
          <Link to="/login" className="rounded-lg border border-input px-5 py-3 text-sm font-semibold">
            Launch Demo
          </Link>
        </div>
        <LandingFooter />
      </section>
    </div>
  );
}

function LandingFooter() {
  return (
    <footer className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
      AgriDrone AI Hub · Prototype. Data shown throughout the product is illustrative demo data. Agricultural outputs
      are AI-assisted decision support, not validated scientific measurements.
    </footer>
  );
}
