import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/crop-analysis")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file");
          if (!(file instanceof File)) {
            return Response.json({ status: "error", message: "No image uploaded." }, { status: 400 });
          }
          return Response.json({
            status: "received",
            filename: file.name,
            size: file.size,
            message: "Crop image received. AI analysis pipeline is not connected yet.",
          });
        } catch {
          return Response.json(
            { status: "error", message: "Could not process the uploaded image." },
            { status: 500 },
          );
        }
      },
    },
  },
});
