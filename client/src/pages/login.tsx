import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Lock, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Admin Portal</h2>
          <p className="text-muted-foreground mt-2">Sign in to manage your fleet</p>
        </div>

        <Card className="shadow-xl border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@49trucking.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full font-bold h-11">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link href="/">
                <a className="hover:text-foreground transition-colors flex items-center justify-center gap-2">
                  &larr; Back to Website
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>Mock Credentials: Use any email and password "admin123"</p>
        </div>
      </div>
    </div>
  );
}
