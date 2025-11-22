import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const QRCodeDialog = ({
  open,
  onOpenChange,
  userId,
}: QRCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogHeader>
          <DialogTitle className="text-center">Patient QR Code</DialogTitle>
        </DialogHeader>

        <QRCodeCanvas value={userId} size={200} includeMargin/>

        <p className="text-sm text-muted-foreground">
          Scan this code to load patient details.
        </p>
      </DialogContent>
    </Dialog>
  );
};
