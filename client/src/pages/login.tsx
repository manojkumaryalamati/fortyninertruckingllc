import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2, HelpCircle } from "lucide-react";
import { isFirebaseConfigured, auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { TruckLoader } from "@/components/TruckLoader";
import { Logo } from "@/components/Logo";

import heroImage1 from "@/assets/a2a02ae8-e30d-4a34-ad88-64598b4c945f_1772219729261.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoggingIn(true);

    try {
      // Show loader for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login(email, password);
    } catch (err: any) {
      let errorMessage = err.message || "Failed to login";
      if (errorMessage.includes("auth/invalid-credential")) {
        errorMessage = "Please enter a valid Email/Password";
      }
      setError(errorMessage);
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }

    setIsResetting(true);
    try {
      if (isFirebaseConfigured()) {
        await sendPasswordResetEmail(auth, email);
        toast({
          title: "Reset Email Sent",
          description: "Check your inbox for password reset instructions.",
        });
        setIsForgotPasswordOpen(false);
      } else {
        // Mock behavior
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Mock Reset Link Sent",
          description: `A password reset link has been sent to ${email} (Mock).`,
        });
        setIsForgotPasswordOpen(false);
      }
    } catch (err: any) {
      console.error("Reset error:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to send reset email",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)] px-4 py-12">
      <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-[var(--border)]">
        
        {/* Left Side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative">
          {isLoggingIn ? (
            <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-3xl">
              <TruckLoader text="Signing securely..." />
            </div>
          ) : null}
          <div className="mb-8">
            <div className="mb-6 flex justify-center md:justify-start">
              <Logo variant="dark" />
            </div>
            <h2 className="text-2xl font-black text-[var(--text)] tracking-tight">Admin Portal</h2>
            <p className="text-[var(--text-muted)] mt-2">Secure access for fleet management.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-[var(--text-muted)]">Email Address</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@49trucking.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-[var(--surface-2)] border-[var(--border)] focus:bg-white text-[var(--text)] placeholder:text-[var(--text-muted)] transition-all"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-[var(--text-muted)]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold text-[var(--text-muted)]">Password</Label>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-[var(--surface-2)] border-[var(--border)] focus:bg-white text-[var(--text)] placeholder:text-[var(--text-muted)] transition-all"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-[var(--text-muted)]" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 font-bold text-base bg-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)] rounded-xl shadow-lg shadow-[var(--shadow)]/50" disabled={isLoggingIn}>
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-end text-sm">
            <Link href="/">
              <span className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors font-medium cursor-pointer">
                Back to Website
              </span>
            </Link>
          </div>
          
          {!isFirebaseConfigured() && (
            <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 text-xs rounded-lg border border-yellow-100">
              <p className="font-bold mb-1">Development Mode</p>
              <p>Mock Credentials: Use any email and password "admin123"</p>
            </div>
          )}
        </div>

        {/* Right Side - Visual */}
        <div className="hidden md:block relative bg-[var(--border)]">
          <div className="absolute inset-0">
            <img 
              src={heroImage1}
              alt="Login Visual"
              className="w-full h-full object-cover opacity-20 mix-blend-multiply"
            />
          </div>
          <div className="relative h-full flex flex-col justify-between p-12 text-[var(--text)]">
            <div className="space-y-2">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[var(--border)] mb-6">
                <CheckCircle2 className="h-6 w-6 text-[var(--text-muted)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)]">Operational Excellence</h3>
              <p className="text-[var(--text-muted)] leading-relaxed max-w-sm">
                Manage your fleet, track shipments, and coordinate drivers all in one centralized platform.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-muted)]">Trusted by 50+ Enterprise Partners</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
