import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { profileSetup } from "@/api";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [conditions, setConditions] = useState({
    sugar: false,
    thyroid: false,
    bonePain: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("Not logged in");
      return;
    }

    await profileSetup(
      user.id,
      name,
      age ? Number(age) : null,
      location,
      alternatePhone,
      bloodGroup,
      conditions
    );

    setLoading(false);
    toast.success("Profile created successfully!");
    navigate("/user/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <UserCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us serve you better by providing your information
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Alternate Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  placeholder="+1234567890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blood">Blood Group</Label>
                <Input
                  id="blood"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  placeholder="A+"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Medical Conditions (Optional)</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sugar"
                    checked={conditions.sugar}
                    onCheckedChange={(checked) =>
                      setConditions((prev) => ({
                        ...prev,
                        sugar: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="sugar" className="text-sm cursor-pointer">
                    Diabetes
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thyroid"
                    checked={conditions.thyroid}
                    onCheckedChange={(checked) =>
                      setConditions((prev) => ({
                        ...prev,
                        thyroid: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="thyroid" className="text-sm cursor-pointer">
                    Thyroid
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bonePain"
                    checked={conditions.bonePain}
                    onCheckedChange={(checked) =>
                      setConditions((prev) => ({
                        ...prev,
                        bonePain: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="bonePain" className="text-sm cursor-pointer">
                    Bone Pain
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Profile..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
