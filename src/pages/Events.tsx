// Events.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search, Sparkles, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEvents } from "./EventContext"; // Import the context



const Events = () => {
  const { events, registerForEvent } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || event.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getRSVPButton = (event: any) => {
    switch (event.rsvpStatus) {
      case "registered":
        return (
          <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 rounded-lg">
            ✓ Registered
          </Button>
        );
      case "attended":
        return (
          <Button className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg">
            ✓ Attended
          </Button>
        );
      default:
        return (
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg"
            onClick={() => registerForEvent(event.id)}
          >
            RSVP Now
          </Button>

        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EventForge
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/create-event">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="rounded-full">
                  Profile
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Discover Events
          </h1>
          <p className="text-gray-600 text-lg">
            Find Web3 events, RSVP, and earn exclusive NFT badges
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-gray-50 rounded-xl h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl" : "rounded-xl border-gray-200"}
              >
                All Events
              </Button>
              <Button
                variant={filter === "upcoming" ? "default" : "outline"}
                onClick={() => setFilter("upcoming")}
                className={filter === "upcoming" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl" : "rounded-xl border-gray-200"}
              >
                Upcoming
              </Button>
              <Button
                variant={filter === "past" ? "default" : "outline"}
                onClick={() => setFilter("past")}
                className={filter === "past" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl" : "rounded-xl border-gray-200"}
              >
                Past Events
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`border-0 ${
                    event.status === "upcoming" 
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                      : "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700"
                  }`}>
                    {event.status === "upcoming" ? "Upcoming" : "Past Event"}
                  </Badge>
                  <div className="text-2xl">{event.badgeEmoji}</div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)} • {formatTime(event.time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/events/${event.id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-lg border-gray-200">
                      View Details
                    </Button>
                  </Link>
                  <div className="flex-1">
                    {getRSVPButton(event)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;