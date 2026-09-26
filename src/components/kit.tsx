import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  description,
  right,
  className,
  children,
}: {
  title?: string;
  description?: string;
  right?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("panel p-5", className)}>
      {title ? (
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
          </div>
          {right}
        </header>
      ) : null}
      {children}
    </section>
  );
}

type Tone = "neutral" | "success" | "warning" | "danger" | "info" | "accent";

const toneClass: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/18 text-warning-foreground",
  danger: "bg-destructive/12 text-destructive",
  info: "bg-info/12 text-info",
  accent: "bg-accent/20 text-accent-foreground",
};

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  tone?: Tone;
}) {
  return (
    <div className="panel flex items-start justify-between gap-3 p-4">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
        {hint ? <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {Icon ? (
        <span className={cn("rounded-lg p-2", toneClass[tone])}>
          <Icon className="size-4" />
        </span>
      ) : null}
    </div>
  );
}

export function Meter({ value, tone = "success" }: { value: number; tone?: Tone }) {
  const bar =
    tone === "danger" ? "bg-destructive" : tone === "warning" ? "bg-warning" : tone === "info" ? "bg-info" : "bg-primary";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all duration-500", bar)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function DemoNote({ children = "Demo data · prototype estimate" }: { children?: ReactNode }) {
  return (
    <p className="mt-3 text-[11px] text-muted-foreground italic">{children}</p>
  );
}

export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function EmptyState({ title, description, icon: Icon }: { title: string; description: string; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-12 text-center">
      {Icon ? <Icon className="mb-3 size-6 text-muted-foreground" /> : null}
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function LoadingRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}
