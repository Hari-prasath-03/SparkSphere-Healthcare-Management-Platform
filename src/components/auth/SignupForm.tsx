import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupUser } from "@/api";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { elements } = e.target as HTMLFormElement;
    const name = (elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (elements.namedItem("password") as HTMLInputElement)
      ?.value;

    const { data, error } = await signupUser(name, email, password);
    if (error) toast.error(`Error: ${error.message}`);
    if (data.user) {
      toast.success(
        "Signup successful! Please check your email to verify your account."
      );
      navigate("/user/profile-setup");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="name" placeholder="Enter your name" className="pl-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
          />
        </div>
      </div>

      <Button className="mt-2 w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
