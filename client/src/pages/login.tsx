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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [isForgotUsernameOpen, setIsForgotUsernameOpen] = useState(false);
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

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login");
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-100">
        
        {/* Left Side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Admin Portal</h2>
            <p className="text-zinc-500 mt-2">Secure access for fleet management.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-zinc-700">Email Address</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@49trucking.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold text-zinc-700">Password</Label>
                
                <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
                  <DialogTrigger asChild>
                    <button type="button" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter your email address and we'll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email Address</Label>
                        <Input 
                          id="reset-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isResetting} className="w-full bg-primary text-white">
                          {isResetting ? <Loader2 className="animate-spin mr-2" /> : null}
                          Send Reset Link
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 font-bold text-base bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl shadow-lg shadow-zinc-900/10">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm">
            <Dialog open={isForgotUsernameOpen} onOpenChange={setIsForgotUsernameOpen}>
              <DialogTrigger asChild>
                <button type="button" className="text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors">
                  <HelpCircle size={14} /> Forgot username?
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Forgot Username?</DialogTitle>
                  <DialogDescription>
                    Your username is typically your company email address.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-2 text-sm text-zinc-600">
                  <p>
                    If you are an administrator or dispatcher, please use your <span className="font-semibold text-zinc-900">@fortyninertrucking.com</span> email address.
                  </p>
                  <p>
                    If you cannot remember which email was used for your account, please contact the IT department or your system administrator directly.
                  </p>
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 mt-4">
                    <p className="font-semibold text-zinc-900 mb-1">System Administrator</p>
                    <p className="text-zinc-500">support@fortyninertrucking.com</p>
                    <p className="text-zinc-500">(925) 250-4605</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsForgotUsernameOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link href="/">
              <a className="text-zinc-500 hover:text-primary transition-colors font-medium">
                Back to Website
              </a>
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
        <div className="hidden md:block relative bg-zinc-900">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=3270&auto=format&fit=crop"
              alt="Login Visual"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            <div className="space-y-2">
              <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-6">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Operational Excellence</h3>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Manage your fleet, track shipments, and coordinate drivers all in one centralized platform.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">Trusted by 50+ Enterprise Partners</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
