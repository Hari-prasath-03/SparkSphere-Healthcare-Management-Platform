import { Badge } from "@/components/ui/badge";
import { User, MapPin, Phone, Droplet, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProfileCardProps {
  profile: {
    name: string;
    age?: number | null;
    location?: string | null;
    alternate_phone?: string | null;
    blood_group?: string | null;
    condition_sugar?: boolean;
    condition_thyroid?: boolean;
    condition_bone_pain?: boolean;
  };
  render?: React.ReactNode;
}

export const ProfileCard = ({ profile, render }: ProfileCardProps) => {
  const conditions: string[] = [];

  if (profile.condition_sugar) conditions.push("Diabetes");
  if (profile.condition_thyroid) conditions.push("Thyroid");
  if (profile.condition_bone_pain) conditions.push("Bone Pain");

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Patient Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
          {profile.age && (
            <p className="text-muted-foreground">Age: {profile.age} years</p>
          )}
        </div>

        <div className="space-y-2">
          {profile.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.alternate_phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profile.alternate_phone}</span>
            </div>
          )}

          {profile.blood_group && (
            <div className="flex items-center gap-2 text-sm">
              <Droplet className="h-4 w-4 text-destructive" />
              <span className="font-semibold">
                Blood Group: {profile.blood_group}
              </span>
            </div>
          )}
        </div>
        {conditions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Activity className="h-4 w-4 text-warning" />
              Medical Conditions
            </div>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {render}
      </CardContent>
    </Card>
  );
};
