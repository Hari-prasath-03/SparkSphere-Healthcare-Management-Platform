import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserRole, loginUser } from "@/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { elements } = e.target as HTMLFormElement;
    const email = (elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (elements.namedItem("password") as HTMLInputElement)
      ?.value;

    const { data, error } = await loginUser(email, password);
    if (error) toast.error("Login error: " + error.message);

    if (data) {
      toast.success("Logged in successfully!");
      navigateUserBasedOnRole(data.user?.id, navigate);
    }
    setIsLoading(false);
  };

  const navigateUserBasedOnRole = async (
    userId: string | undefined,
    navigate: ReturnType<typeof useNavigate>
  ) => {
    if (!userId) return;
    const role = await getUserRole(userId);
    if (role.data?.role === "user") {
      navigate("/user/home");
    } else if (role.data?.role === "hospital") {
      navigate("/hospital/home");
    }
  };

  return (
    <form onSubmit={handlelogin} className="space-y-4">
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
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
