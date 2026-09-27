import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useBrowserCamera } from "../hooks/useBrowserCamera";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/app/crop-camera")({
  head: () => ({
    meta: [
      { title: "Crop Intelligence Camera — AgriDrone AI Hub" },
      {
        name: "description",
        content:
          "Capture crop imagery with your device camera and send it for AI-assisted crop condition analysis.",
      },
      { property: "og:title", content: "Crop Intelligence Camera — AgriDrone AI Hub" },
      {
        property: "og:description",
        content: "Capture crop imagery for AI-assisted crop condition analysis.",
      },
    ],
  }),
  component: CropCamera,
});

type AnalysisResult = {
  status?: string;
  filename?: string;
  size?: number;
  message?: string;
  [key: string]: unknown;
};

const KNOWN_KEYS = new Set(["status", "filename", "size", "message"]);

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = /:(.*?);/.exec(header ?? "")?.[1] ?? "image/jpeg";
  const binary = atob(base64 ?? "");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function CropCamera() {
  const { videoRef, isActive, error, startCamera, stopCamera, captureImage, setError } =
    useBrowserCamera("environment");
  const [captured, setCaptured] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  async function analyze(dataUrl: string) {
    setAnalyzing(true);
    setBackendError(null);
    setResult(null);
    try {
      const blob = dataUrlToBlob(dataUrl);
      const formData = new FormData();
      formData.append("file", blob, "crop-image.jpg");
      const response = await fetch("/api/crop-analysis", { method: "POST", body: formData });
      if (!response.ok) throw new Error(String(response.status));
      setResult((await response.json()) as AnalysisResult);
    } catch {
      setBackendError("Could not connect to the crop analysis backend.");
    } finally {
      setAnalyzing(false);
    }
  }

  function handleCapture() {
    const dataUrl = captureImage();
    if (!dataUrl) {
      setError("Camera frame was not ready. Try again.");
      return;
    }
    stopCamera();
    setCaptured(dataUrl);
    void analyze(dataUrl);
  }

  function handleRetake() {
    setCaptured(null);
    setResult(null);
    setBackendError(null);
    void startCamera();
  }

  const extraFields = result
    ? Object.entries(result).filter(([key, value]) => !KNOWN_KEYS.has(key) && value != null)
    : [];

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            AgriDrone AI Hub
          </p>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Crop Intelligence Camera
          </h1>
          <p className="text-sm text-muted-foreground">
            Capture crop imagery for AI-assisted crop condition analysis.
          </p>
        </header>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Capture</CardTitle>
            <CardDescription>
              Hold the device steady over the crop canopy for the clearest frame.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
              {captured ? (
                <img src={captured} alt="Captured crop" className="h-full w-full object-cover" />
              ) : (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  autoPlay
                  className={`h-full w-full object-cover ${isActive ? "" : "hidden"}`}
                />
              )}
              {!captured && !isActive && (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
                  Camera is off. Tap “Open Camera” to begin.
                </div>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {!captured && !isActive && (
                <Button onClick={() => void startCamera()}>📷 Open Camera</Button>
              )}
              {isActive && !captured && (
                <>
                  <Button onClick={handleCapture}>📸 Capture Crop Image</Button>
                  <Button variant="outline" onClick={stopCamera}>
                    Close Camera
                  </Button>
                </>
              )}
              {captured && (
                <Button variant="outline" onClick={handleRetake}>
                  🔄 Retake
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {analyzing && (
          <Card className="rounded-2xl">
            <CardContent className="py-6 text-sm text-muted-foreground">
              🤖 Analyzing crop...
            </CardContent>
          </Card>
        )}

        {backendError && !analyzing && (
          <Card className="rounded-2xl border-destructive/40">
            <CardContent className="py-6 text-sm text-destructive">{backendError}</CardContent>
          </Card>
        )}

        {result && !analyzing && (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Status" value={result.status ?? "unknown"} />
              <Row label="Filename" value={result.filename ?? "—"} />
              <Row
                label="Image size"
                value={typeof result.size === "number" ? formatBytes(result.size) : "—"}
              />
              <Row label="Message" value={result.message ?? "—"} />
              {extraFields.map(([key, value]) => (
                <Row
                  key={key}
                  label={key}
                  value={typeof value === "object" ? JSON.stringify(value) : String(value)}
                />
              ))}
            </CardContent>
          </Card>
        )}

        <p className="rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
          AI analysis is decision support and should not be treated as a guaranteed disease
          diagnosis.
        </p>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-2 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
      <span className="font-medium capitalize text-muted-foreground">{label}</span>
      <span className="break-all text-foreground sm:text-right">{value}</span>
    </div>
  );
}
