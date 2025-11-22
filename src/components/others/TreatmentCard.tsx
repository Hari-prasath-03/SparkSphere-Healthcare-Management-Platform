import { Calendar, Pill } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Treatment {
  id: string;
  patient_id: string;
  hospital_id: string;
  description: string;
  prescription: Record<string, unknown> | null;
  treatment_date: string;
  created_at: string;
  hospital: {
    name: string | null;
    role: string | null;
  } | null;
}

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const date = new Date(treatment.treatment_date);

  return (
    <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all gap-0">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary" />
          Treatment Record
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {treatment.description}
        </p>

        {treatment.prescription && (
          <div className="p-4 rounded-xl bg-muted/40 space-y-3 border">
            <p className="font-medium text-sm">Prescription</p>

            <div className="flex flex-col gap-2">
              {Object.entries(treatment.prescription).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <Badge variant="outline" className="capitalize">
                    {key}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {treatment.hospital?.name && (
          <p className="text-sm text-muted-foreground">
            {treatment.hospital.name}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
          <Calendar className="h-4 w-4" />
          {date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
}
