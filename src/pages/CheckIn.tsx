
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, QrCode, Camera, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CheckIn = () => {
  const [checkInCode, setCheckInCode] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkedInEvent, setCheckedInEvent] = useState(null);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkInCode.toLowerCase() === "web3dev2024") {
      setCheckedInEvent({
        title: "Web3 Developer Meetup",
        badgeEmoji: "🎯",
        date: "Dec 15, 2024"
      });
      setIsCheckedIn(true);
    }
    console.log("Submitting check-in code:", checkInCode);
  };

  const simulateQRScan = () => {
    setCheckedInEvent({
      title: "NFT Art Exhibition",
      badgeEmoji: "🎨",
      date: "Dec 20, 2024"
    });
    setIsCheckedIn(true);
  };

  if (isCheckedIn && checkedInEvent) {
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
          <div className="max-w-md mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Check-in Successful!
              </h1>
              <p className="text-gray-600 text-lg">
                Welcome to {checkedInEvent.title}
              </p>
            </div>

            {/* NFT Badge Preview */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 mb-8">
              <CardContent className="p-8">
                <h3 className="font-semibold text-gray-700 mb-4">Your NFT Badge is Ready!</h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="text-5xl mb-3">{checkedInEvent.badgeEmoji}</div>
                  <div className="font-medium text-gray-700">{checkedInEvent.title}</div>
                  <div className="text-sm text-gray-500 mt-1">Attendance Badge</div>
                  <div className="text-xs text-gray-400 mt-2">{checkedInEvent.date}</div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your NFT badge will be minted to your wallet within 24 hours
                </p>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">Transaction Hash</div>
                  <code className="text-xs font-mono text-gray-700">0xabc123...def789</code>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/profile">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12">
                  View My Badges
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" className="w-full rounded-xl border-gray-200 h-12">
                  Discover More Events
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsCheckedIn(false);
                  setCheckedInEvent(null);
                  setCheckInCode("");
                }}
                className="w-full text-gray-600"
              >
                Check in to Another Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Event Check-in
            </h1>
            <p className="text-gray-600 text-lg">
              Verify your attendance and earn your NFT badge
            </p>
          </div>

          {/* Check-in Methods */}
          <div className="space-y-6">
            {/* QR Code Scan */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scan QR Code</h3>
                <p className="text-gray-600 mb-6">
                  Use your camera to scan the event QR code for instant check-in
                </p>
                <Button 
                  onClick={simulateQRScan}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </Button>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Manual Code Entry */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">Enter Event Code</h3>
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkin-code" className="text-sm font-medium text-gray-700">
                      Event Check-in Code
                    </Label>
                    <Input
                      id="checkin-code"
                      value={checkInCode}
                      onChange={(e) => setCheckInCode(e.target.value)}
                      placeholder="Enter the code from the organizer"
                      className="border-0 bg-gray-50 rounded-xl h-12 text-center font-mono text-lg"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12"
                  >
                    Check In
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-700 mb-3">Need Help?</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Look for QR codes displayed at the event venue</p>
                  <p>• Ask the event organizer for the check-in code</p>
                  <p>• Make sure you're connected to the event WiFi</p>
                  <p>• Contact support if you're having trouble</p>
                </div>
              </CardContent>
            </Card>

            {/* Demo Note */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
              <CardContent className="p-4">
                <p className="text-sm text-yellow-700 text-center">
                  <strong>Demo:</strong> Try entering "web3dev2024" as the check-in code
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
