import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export interface TreatmentFormValues {
  description: string;
  medicine: string;
  dosage: string;
  notes: string;
}

export function AddTreatmentForm({
  submitting,
  onSubmit,
}: {
  submitting: boolean;
  onSubmit: (values: TreatmentFormValues) => void;
}) {
  const [values, setValues] = useState<TreatmentFormValues>({
    description: "",
    medicine: "",
    dosage: "",
    notes: "",
  });

  const update = (field: keyof TreatmentFormValues, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Add New Treatment Record
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        {/* Description */}
        <div className="space-y-2">
          <Label>Treatment Description</Label>
          <Textarea
            placeholder="Enter diagnosis, condition, procedure…"
            rows={4}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        {/* Medicine */}
        <div className="space-y-2">
          <Label>Medicine</Label>
          <Input
            placeholder="Example: Paracetamol"
            value={values.medicine}
            onChange={(e) => update("medicine", e.target.value)}
          />
        </div>

        {/* Dosage */}
        <div className="space-y-2">
          <Label>Dosage</Label>
          <Input
            placeholder="Example: 1 tablet twice daily"
            value={values.dosage}
            onChange={(e) => update("dosage", e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Additional Notes (Optional)</Label>
          <Textarea
            placeholder="Observations, patient behavior, allergies…"
            rows={3}
            value={values.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>

        <Button
          onClick={() => onSubmit(values)}
          disabled={submitting}
          className="w-full"
        >
          {submitting ? "Adding…" : "Add Treatment"}
        </Button>
      </div>
    </>
  );
}
