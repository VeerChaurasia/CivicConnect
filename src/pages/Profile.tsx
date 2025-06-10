
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, ExternalLink, Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const userProfile = {
    walletAddress: "0x742d35...5C98",
    fullWalletAddress: "0x742d35Cc6C8965A8F7eFDeB60E63b58c5C98",
    joinDate: "November 2024",
    totalEvents: 12,
    totalBadges: 8,
    eventsHosted: 3
  };

  const nftBadges = [
    {
      id: 1,
      emoji: "🎯",
      eventName: "Web3 Developer Meetup",
      date: "Dec 15, 2024",
      rarity: "Common",
      status: "earned"
    },
    {
      id: 2,
      emoji: "🎨",
      eventName: "NFT Art Exhibition",
      date: "Dec 20, 2024",
      rarity: "Rare",
      status: "earned"
    },
    {
      id: 3,
      emoji: "💰",
      eventName: "DeFi Workshop",
      date: "Dec 10, 2024",
      rarity: "Common",
      status: "earned"
    },
    {
      id: 4,
      emoji: "🏛️",
      eventName: "DAO Governance Discussion",
      date: "Dec 12, 2024",
      rarity: "Uncommon",
      status: "earned"
    },
    {
      id: 5,
      emoji: "⚡",
      eventName: "Blockchain Summit 2024",
      date: "Jan 5, 2025",
      rarity: "Epic",
      status: "upcoming"
    },
    {
      id: 6,
      emoji: "🚀",
      eventName: "Crypto Startup Pitch",
      date: "Jan 10, 2025",
      rarity: "Rare",
      status: "upcoming"
    }
  ];

  const recentActivity = [
    {
      type: "badge_earned",
      message: "Earned NFT badge from DAO Governance Discussion",
      date: "2 days ago"
    },
    {
      type: "event_rsvp",
      message: "RSVP'd to Blockchain Summit 2024",
      date: "5 days ago"
    },
    {
      type: "event_created",
      message: "Created event: Web3 Security Workshop",
      date: "1 week ago"
    },
    {
      type: "badge_earned",
      message: "Earned NFT badge from DeFi Workshop",
      date: "1 week ago"
    }
  ];

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(userProfile.fullWalletAddress);
    console.log("Wallet address copied to clipboard");
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-700";
      case "Uncommon": return "bg-green-100 text-green-700";
      case "Rare": return "bg-blue-100 text-blue-700";
      case "Epic": return "bg-purple-100 text-purple-700";
      case "Legendary": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
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
              <Link to="/create-event">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6">
                  Create Event
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
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your Web3 identity and NFT badge collection
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                {/* Profile Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white font-bold">
                      {userProfile.walletAddress.slice(2, 4).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Web3 User</h2>
                  <p className="text-sm text-gray-600">Member since {userProfile.joinDate}</p>
                </div>

                {/* Wallet Address */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <code className="flex-1 text-sm font-mono text-gray-700">
                      {userProfile.walletAddress}
                    </code>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={copyWalletAddress}
                      className="p-1 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600">Events Attended</span>
                    <span className="font-semibold text-purple-700">{userProfile.totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600">NFT Badges</span>
                    <span className="font-semibold text-purple-700">{userProfile.totalBadges}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600">Events Hosted</span>
                    <span className="font-semibold text-purple-700">{userProfile.eventsHosted}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <Link to="/events" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl">
                      Browse Events
                    </Button>
                  </Link>
                  <Link to="/create-event" className="block">
                    <Button variant="outline" className="w-full rounded-xl border-gray-200">
                      Create New Event
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* NFT Badge Collection */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-purple-600" />
                    NFT Badge Collection
                  </h3>
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0">
                    {userProfile.totalBadges} Earned
                  </Badge>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nftBadges.map((badge) => (
                    <Card 
                      key={badge.id} 
                      className={`border-2 transition-all duration-300 hover:shadow-lg ${
                        badge.status === "earned" 
                          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50" 
                          : "border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 opacity-60"
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{badge.emoji}</div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">{badge.eventName}</h4>
                        <p className="text-xs text-gray-500 mb-3">{badge.date}</p>
                        <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                        {badge.status === "upcoming" && (
                          <div className="text-xs text-orange-600 font-medium mt-2">
                            Upcoming Event
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.type === "badge_earned" ? "bg-green-500" :
                        activity.type === "event_rsvp" ? "bg-blue-500" :
                        "bg-purple-500"
                      }`} />
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
