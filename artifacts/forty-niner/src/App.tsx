import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, ProtectedRoute } from "./lib/auth";
import { lazy, Suspense, useEffect } from "react";
import { TruckLoader } from "@/components/TruckLoader";

// Lazy imports for performance optimization
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const AdminDashboard = lazy(() => import("@/pages/admin"));
const TrucksManagement = lazy(() => import("@/pages/admin/trucks"));
const DriversManagement = lazy(() => import("@/pages/admin/drivers"));
const TripsManagement = lazy(() => import("@/pages/admin/trips"));
const DocumentsCenter = lazy(() => import("@/pages/admin/documents"));
const AdminApplications = lazy(() => import("@/pages/admin/applications"));
const AdminSubhaulers = lazy(() => import("@/pages/admin/subhaulers"));
const Certifications = lazy(() => import("@/pages/certifications"));
const Services = lazy(() => import("@/pages/services"));
const Fleet = lazy(() => import("@/pages/fleet"));
const Careers = lazy(() => import("@/pages/careers"));
const Subhaulers = lazy(() => import("@/pages/subhaulers"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));

// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-[var(--surface-2)]"><TruckLoader text="Loading..." /></div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        
        {/* Protected Routes */}
        <Route path="/admin">
          {() => <ProtectedRoute component={AdminDashboard} />}
        </Route>
        <Route path="/admin/trucks">
          {() => <ProtectedRoute component={TrucksManagement} />}
        </Route>
        <Route path="/admin/drivers">
          {() => <ProtectedRoute component={DriversManagement} />}
        </Route>
        <Route path="/admin/trips">
           {() => <ProtectedRoute component={TripsManagement} />}
        </Route>
        <Route path="/admin/documents">
           {() => <ProtectedRoute component={DocumentsCenter} />}
        </Route>
        <Route path="/admin/applications">
           {() => <ProtectedRoute component={AdminApplications} />}
        </Route>
        <Route path="/admin/subhaulers">
           {() => <ProtectedRoute component={AdminSubhaulers} />}
        </Route>

        <Route path="/services" component={Services} />
        <Route path="/fleet" component={Fleet} />
        <Route path="/certifications" component={Certifications} />
        <Route path="/careers" component={Careers} />
        <Route path="/subhaulers" component={Subhaulers} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Toaster />
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
