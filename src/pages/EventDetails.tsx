
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Sparkles, ArrowLeft, Share2, QrCode } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  
  // Mock event data - in real app this would come from API
  const event = {
    id: 1,
    title: "Web3 Developer Meetup",
    date: "Dec 15, 2024",
    time: "6:00 PM",
    location: "TechHub SF",
    address: "123 Tech Street, San Francisco, CA 94105",
    attendees: 124,
    maxAttendees: 200,
    badgePreview: "🎯",
    status: "upcoming",
    description: "Join fellow developers for an evening of networking, learning, and discussing the latest in Web3 technology. We'll have presentations on DeFi protocols, NFT marketplaces, and blockchain development best practices.",
    rsvpStatus: "not-registered",
    organizer: "Alex Chen",
    agenda: [
      { time: "6:00 PM", item: "Registration & Networking" },
      { time: "6:30 PM", item: "Welcome & Introductions" },
      { time: "7:00 PM", item: "DeFi Protocol Deep Dive" },
      { time: "7:30 PM", item: "NFT Marketplace Architecture" },
      { time: "8:00 PM", item: "Panel Discussion" },
      { time: "8:30 PM", item: "Networking & Closing" }
    ]
  };

  const getRSVPButton = () => {
    switch (event.rsvpStatus) {
      case "registered":
        return (
          <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200 rounded-xl h-12 text-lg">
            ✓ You're Registered
          </Button>
        );
      case "attended":
        return (
          <Button className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl h-12 text-lg">
            ✓ You Attended - Check Your NFT Badge
          </Button>
        );
      default:
        return (
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-medium">
            RSVP Now - Earn {event.badgePreview} Badge
          </Button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
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
              <Link to="/events">
                <Button variant="ghost" className="rounded-full">
                  Browse Events
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
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/events">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0 text-sm px-3 py-1">
                      Upcoming Event
                    </Badge>
                    <div className="text-4xl">{event.badgePreview}</div>
                  </div>
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {event.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Event Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-gray-500">{event.address}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{event.attendees}/{event.maxAttendees} Attending</div>
                      <div className="text-sm text-gray-500">
                        {event.maxAttendees - event.attendees} spots remaining
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Organized by {event.organizer}</div>
                      <div className="text-sm text-gray-500">Verified organizer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Section */}
              <div className="flex gap-4">
                <div className="flex-1">
                  {getRSVPButton()}
                </div>
                <Button variant="outline" className="px-6 rounded-xl border-gray-200">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="px-6 rounded-xl border-gray-200">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Agenda */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Event Agenda</h3>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                        <div className="text-sm font-medium text-purple-600 w-20">
                          {item.time}
                        </div>
                        <div className="flex-1 text-gray-700">
                          {item.item}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* About this Event */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 mb-4">
                      This Web3 Developer Meetup is designed for developers, entrepreneurs, and blockchain enthusiasts 
                      who want to stay at the forefront of Web3 technology. Whether you're just starting your journey 
                      or you're a seasoned developer, this event offers valuable insights and networking opportunities.
                    </p>
                    <p className="text-gray-600 mb-4">
                      We'll cover the latest developments in DeFi protocols, explore NFT marketplace architectures, 
                      and discuss best practices for blockchain development. The event includes hands-on demos, 
                      expert presentations, and plenty of time for networking with like-minded professionals.
                    </p>
                    <p className="text-gray-600">
                      All attendees will receive an exclusive NFT badge that serves as proof of attendance and 
                      grants access to our private Discord community for ongoing discussions and collaboration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* NFT Badge Preview */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-gray-700 mb-4">Your NFT Badge</h4>
                  <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                    <div className="text-5xl mb-3">{event.badgePreview}</div>
                    <div className="font-medium text-gray-700">{event.title}</div>
                    <div className="text-sm text-gray-500 mt-1">Attendance Badge</div>
                    <div className="text-xs text-gray-400 mt-2">{event.date}</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Attend this event to earn this exclusive NFT badge
                  </p>
                </CardContent>
              </Card>

              {/* Event Stats */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-4">Event Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Registered</span>
                      <span className="font-medium">{event.attendees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Spots</span>
                      <span className="font-medium">{event.maxAttendees - event.attendees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Badge Rarity</span>
                      <span className="font-medium text-purple-600">Limited Edition</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Link to="/check-in" className="block">
                      <Button variant="outline" className="w-full justify-start rounded-xl">
                        <QrCode className="w-4 h-4 mr-2" />
                        Event Check-in
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
