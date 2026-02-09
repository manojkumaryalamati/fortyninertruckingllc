import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, ProtectedRoute } from "./lib/auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import AdminDashboard from "@/pages/admin";
import TrucksManagement from "@/pages/admin/trucks";
import DriversManagement from "@/pages/admin/drivers";
import TripsManagement from "@/pages/admin/trips";
import DocumentsCenter from "@/pages/admin/documents";
import AdminApplications from "@/pages/admin/applications";
import Certifications from "@/pages/certifications";
import Services from "@/pages/services";
import Fleet from "@/pages/fleet";
import Careers from "@/pages/careers";
import Subhaulers from "@/pages/subhaulers";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import { useEffect } from "react";

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

      <Route path="/services" component={Services} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/certifications" component={Certifications} />
      <Route path="/careers" component={Careers} />
      <Route path="/subhaulers" component={Subhaulers} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
