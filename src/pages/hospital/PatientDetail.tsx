/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ProfileCard,
  type ProfileCardProps,
} from "@/components/others/ProfileCard";
import {
  TreatmentCard,
  type Treatment,
} from "@/components/others/TreatmentCard";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

import { getProfile, addTreatment, getTreatments } from "@/api";
import { useAuth } from "@/providers/AuthProvider";
import Loader from "@/components/others/Loader";
import {
  AddTreatmentForm,
  type TreatmentFormValues,
} from "@/components/others/AddTreatmentForm";

export default function PatientDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: hospital } = useAuth();

  const [profile, setProfile] = useState<ProfileCardProps["profile"] | null>(
    null
  );
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const [profileRes, treatmentsRes] = await Promise.all([
      getProfile(userId!),
      getTreatments(userId!),
    ]);

    setProfile(profileRes.data || null);
    setTreatments(treatmentsRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;
    fetchAll();
  }, [userId]);

  const handleAddTreatment = async (values: TreatmentFormValues) => {
    if (!values.description.trim()) {
      toast.error("Description cannot be empty");
      return;
    }

    setSubmitting(true);
    const prescription = {
      medicine: values.medicine,
      dosage: values.dosage,
      notes: values.notes,
    };

    const { error } = await addTreatment(
      userId!,
      hospital!.id,
      values.description,
      prescription
    );

    setSubmitting(false);

    if (error) {
      toast.error("Failed to add treatment");
      return;
    }
    toast.success("Treatment added successfully!");
    setDialogOpen(false);
    fetchAll();
  };

  if (loading) return <Loader />;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">
            Patient not found
          </p>
          <Button onClick={() => navigate("/hospital/home")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-secondary/5 via-background to-primary/5">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate("/hospital/home")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <ProfileCard profile={profile} />
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Treatment History</h2>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Treatment
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <AddTreatmentForm
                    submitting={submitting}
                    onSubmit={(data) => handleAddTreatment(data)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {treatments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {treatments.map((treatment, i) => (
                  <TreatmentCard key={i} treatment={treatment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
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
