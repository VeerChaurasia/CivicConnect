
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Web3 Developer Meetup",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      location: "TechHub SF",
      attendees: 124,
      maxAttendees: 200,
      badgePreview: "🎯",
    },
    {
      id: 2,
      title: "NFT Art Exhibition",
      date: "Dec 20, 2024",
      time: "7:30 PM",
      location: "Crypto Gallery",
      attendees: 89,
      maxAttendees: 150,
      badgePreview: "🎨",
    },
    {
      id: 3,
      title: "Blockchain Summit 2024",
      date: "Jan 5, 2025",
      time: "9:00 AM",
      location: "Convention Center",
      attendees: 456,
      maxAttendees: 500,
      badgePreview: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EventForge
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/events">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Browse Events
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6">
              Login with Civic
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Web3 Events
            <br />
            Reimagined
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, discover, and attend events in the Web3 era. Earn exclusive NFT badges and connect with like-minded innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-8 py-3 text-lg"
            >
              🔐 Login with Civic
            </Button>
            <Link to="/events">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-200 hover:border-purple-300 rounded-full px-8 py-3 text-lg"
              >
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Events</h3>
              <p className="text-gray-600">Host Web3 events and manage attendees with built-in wallet integration.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">RSVP & Attend</h3>
              <p className="text-gray-600">Register for events seamlessly and verify attendance through QR codes.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn NFT Badges</h3>
              <p className="text-gray-600">Collect unique NFT badges for each event you attend and build your portfolio.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover upcoming Web3 events and start earning your NFT badge collection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0">
                    Upcoming
                  </Badge>
                  <div className="text-2xl">{event.badgePreview}</div>
                </div>
                
                <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} • {event.time}</span>
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
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/events">
            <Button variant="outline" className="border-2 border-purple-200 hover:border-purple-300 rounded-full px-8">
              View All Events
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EventForge
            </span>
          </div>
          <p className="text-center text-gray-500 mt-2">
            Powered by Web3 • Built for the future
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
