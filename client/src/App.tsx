import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin";
import DriversManagement from "@/pages/admin/drivers";
import TrucksManagement from "@/pages/admin/trucks";
import TripsManagement from "@/pages/admin/trips";
import Services from "@/pages/services";
import Fleet from "@/pages/fleet";
import Careers from "@/pages/careers";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/drivers" component={DriversManagement} />
      <Route path="/admin/trucks" component={TrucksManagement} />
      <Route path="/admin/trips" component={TripsManagement} />
      <Route path="/services" component={Services} />
      <Route path="/fleet" component={Fleet} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
