import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { toast } from "sonner";

interface QRScannerProps {
  onScan: (userId: string) => void;
}

export const QRScanner = ({ onScan }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let stream: MediaStream | null = null;
    let stopped = false;

    const startScan = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const scanLoop = async () => {
          if (stopped) return;

          try {
            const result = await reader.decodeOnceFromVideoElement(
              videoRef.current!
            );

            if (result) {
              const scanned = result.getText();
              onScan(scanned);
              stopped = true;

              stream?.getTracks().forEach((track) => track.stop());
            }
          } catch (e) {
            toast.error("Scanning error. " + e);
          }

          if (!stopped) {
            requestAnimationFrame(scanLoop);
          }
        };

        scanLoop();
      } catch (err) {
        console.error(err);
        setError("Unable to access camera");
      }
    };

    startScan();

    return () => {
      stopped = true;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>

      <CardContent>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};
