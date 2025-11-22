import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRScanner } from "@/components/others/QRScanner";
import { LogOut, Search, QrCode, Building2 } from "lucide-react";
import { signOutUser } from "@/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function HospitalHome() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      toast.error("Error signing out. Please try again.");
      return;
    }
    navigate("/auth");
  };

  const handleSearch = () => {
    if (!userId.trim()) return toast.error("Enter patient ID");
    navigate(`/hospital/patient/${userId}`);
  };

  const handleScan = (scannedUserId: string) => {
    navigate(`/hospital/patient/${scannedUserId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-secondary/5 via-background to-primary/5">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-secondary" />
            <h1 className="text-2xl font-bold text-foreground">
              Hospital Portal
            </h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Welcome to SparkSphere</h2>
          <p className="text-muted-foreground">
            Access patient records securely
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search by Patient ID
              </CardTitle>
              <CardDescription>
                Enter the patient's unique identifier
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="Enter patient ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Patient
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Scan QR Code
              </CardTitle>
              <CardDescription>
                Quick access via patient QR code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={scannerOpen} onOpenChange={setScannerOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="w-full">
                    <QrCode className="h-4 w-4 mr-2" />
                    Launch Scanner
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Scan Patient QR Code</DialogTitle>
                  </DialogHeader>
                  <QRScanner onScan={handleScan} />
                </DialogContent>
              </Dialog>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                The scanner will automatically detect and redirect
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
