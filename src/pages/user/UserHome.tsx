/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/others/ProfileCard";
import {
  TreatmentCard,
  type Treatment,
} from "@/components/others/TreatmentCard";
import { LogOut, FileText } from "lucide-react";
import { getProfile, signOutUser, getTreatments } from "@/api";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import Loader from "@/components/others/Loader";
import { useNavigate } from "react-router-dom";
import { QRCodeDialog } from "@/components/others/QRCodeDialog";

export default function UserHome() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (error) {
      toast.error("Error signing out: " + error.message);
      return;
    }
    navigate("/auth");
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
    (async () => {
      if (!user) return;
      setLoading(true);
      const [
        { data: profileData, error: profileErr },
        { data: treatmentData, error: treatmentErr },
      ] = await Promise.all([getProfile(user.id), getTreatments(user.id)]);

      if (profileErr) toast.error("Failed to load profile data.");

      if (treatmentErr) toast.error("Failed to load treatment history.");

      setProfile(profileData || null);
      setTreatments(treatmentData || []);
      setLoading(false);
    })();
  }, [user, authLoading]);

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">SparkSphere</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            {loading ? (
              <Loader minHeight="h-48" />
            ) : (
              profile && (
                <ProfileCard
                  profile={profile}
                  render={
                    <>
                      <Button
                        variant="outline"
                        className="self-end"
                        onClick={() => setShowQr(true)}
                      >
                        Show QR Code
                      </Button>
                      <QRCodeDialog
                        open={showQr}
                        onOpenChange={setShowQr}
                        userId={user?.id || ""}
                      />
                    </>
                  }
                />
              )
            )}
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Treatment History</h2>
            </div>

            {treatments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {treatments.map((treatment, i) => (
                  <TreatmentCard key={i} treatment={treatment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No treatment records yet
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
