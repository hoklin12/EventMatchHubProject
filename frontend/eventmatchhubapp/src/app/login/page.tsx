

"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import { Eye, EyeOff, Users, Briefcase } from "lucide-react";
import { dummyLogin } from "@/lib/dummyAuth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"participant" | "organizer">("participant");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await dummyLogin(email, password);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    // Optional: enforce role tab match
    if (result.role !== userType) {
      setError(`This account is a ${result.role}. Please switch to the ${result.role} tab.`);
      setIsLoading(false);
      return;
    }

    // Success — redirect
    const routeMap = {
      participant: "/participant/overview",
      organizer: "/organizer/general",
    };
    router.push(routeMap[userType]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="container mx-auto flex items-center justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Event Match Hub account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="participant" className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" /> Participant
              </TabsTrigger>
              <TabsTrigger value="organizer" className="flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Organizer
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm font-medium leading-none">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
            </Button>
          </form>

          {/* Optional: Show test credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
            <p className="font-semibold text-gray-800">Test Accounts:</p>
            <div>
              <strong>Participant:</strong> participant@example.com / 123456
            </div>
            <div>
              <strong>Organizer:</strong> organizer@example.com / 123456
            </div>
            <div>
              <strong>Admin Organizer:</strong> admin@example.com / admin123
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"> {/* Google SVG */} </svg>
              Google
            </Button>
            <Button variant="outline" type="button">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"> {/* GitHub SVG */} </svg>
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
