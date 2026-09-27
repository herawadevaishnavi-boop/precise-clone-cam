import { useCallback, useEffect, useRef, useState } from "react";

export function useBrowserCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCamera = useCallback(async () => {
    setError(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOn(true);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "NotAllowedError") {
        setError(
          "Camera permission denied. Please allow camera access in your browser settings.",
        );
      } else {
        setError("Could not open the camera.");
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureImage = useCallback((): string | null => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = Math.min(video.videoWidth, 1280);
    canvas.height = Math.round(
      (canvas.width / video.videoWidth) * video.videoHeight,
    );

    const context = canvas.getContext("2d");

    if (!context) {
      return null;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

    stopCamera();

    return dataUrl;
  }, [stopCamera]);

  return {
    videoRef,
    cameraOn,
    error,
    openCamera,
    stopCamera,
    captureImage,
  };
}
