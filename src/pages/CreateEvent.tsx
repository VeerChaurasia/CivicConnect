
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Calendar, MapPin, Users, Image, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    badgeEmoji: "🎯"
  });

  const badgeOptions = ["🎯", "🎨", "⚡", "💰", "🏛️", "🚀", "🌟", "🔥", "💎", "🎵"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating event:", formData);
    // Here you would typically submit to your backend
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

        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-gray-600 text-lg">
              Host your Web3 event and distribute NFT badges to attendees
            </p>
          </div>

          {/* Event Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-center">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter your event title"
                    className="border-0 bg-gray-50 rounded-xl h-12"
                    required
                  />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your event, what attendees can expect..."
                    className="border-0 bg-gray-50 rounded-xl min-h-[100px] resize-none"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="border-0 bg-gray-50 rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                      Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className="border-0 bg-gray-50 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Event venue or 'Online'"
                    className="border-0 bg-gray-50 rounded-xl h-12"
                    required
                  />
                </div>

                {/* Max Attendees */}
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Maximum Attendees *
                  </Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                    placeholder="e.g., 100"
                    className="border-0 bg-gray-50 rounded-xl h-12"
                    min="1"
                    required
                  />
                </div>

                {/* NFT Badge Preview */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    NFT Badge Emoji
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {badgeOptions.map((emoji) => (
                      <Button
                        key={emoji}
                        type="button"
                        variant={formData.badgeEmoji === emoji ? "default" : "outline"}
                        className={`h-12 text-2xl ${
                          formData.badgeEmoji === emoji 
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                            : "border-gray-200 hover:border-purple-300"
                        } rounded-xl`}
                        onClick={() => handleInputChange("badgeEmoji", emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    This emoji will appear on the NFT badges earned by attendees
                  </p>
                </div>

                {/* Badge Preview */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 text-center">
                  <h4 className="font-medium text-gray-700 mb-3">Badge Preview</h4>
                  <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl mb-2">{formData.badgeEmoji}</div>
                    <div className="text-sm font-medium text-gray-600">
                      {formData.title || "Your Event"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">NFT Badge</div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-medium"
                  >
                    Create Event & Deploy NFTs
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
