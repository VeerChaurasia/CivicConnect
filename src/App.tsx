
import { Toaster } from "@/components/ui/toaster";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <CivicAuthProvider clientId="610da918-44d6-4cff-87f2-ec0415233e37">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <EventProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </EventProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </CivicAuthProvider>
);

export default App;
