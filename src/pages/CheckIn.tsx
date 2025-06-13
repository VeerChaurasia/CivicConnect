import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, QrCode, Camera, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useUser } from "@civic/auth-web3/react";
import { useState } from "react";
import EventBadgeNFT from "../abi/EventBadgeNFT.json"; // ABI JSON
import { ethers } from 'ethers';
import { Link } from "react-router-dom";

const CheckIn = () => {
  const {ethereum} = useUser();
  const [checkInCode, setCheckInCode] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkedInEvent, setCheckedInEvent] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingStatus, setMintingStatus] = useState("");
  const [transactionHash, setTransactionHash] = useState("");


  const CONTRACT_ADDRESS = "0xB0Ee4A25b92E52011E8388FD56943B8B8A3Aa5cF"; 
  const getABI = () => {
    console.log("EventBadgeNFT import:", EventBadgeNFT); // Debug log
    if (EventBadgeNFT.abi) {
      return EventBadgeNFT.abi;
    }
    if (Array.isArray(EventBadgeNFT)) {
      return EventBadgeNFT;
    }
    return EventBadgeNFT;
  };
  

  
  const mintNFTOnChain = async (userAddress: string, eventId: number) => {
    setIsMinting(true);
    try {
      setMintingStatus("Contacting backend to mint NFT...");
  
      const res = await fetch("http://localhost:3000/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress, eventId }),
      });
  
      let responseText = await res.text();
  
      // Attempt to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Raw response not valid JSON:", responseText);
        throw new Error(`Invalid JSON response from server`);
      }
  
      if (!res.ok) {
        throw new Error(data?.error || "Backend returned an error");
      }
  
      setMintingStatus("NFT minted successfully!");
      setTransactionHash(data.txHash);
      return data.txHash;
    } catch (err: any) {
      console.error("Minting error:", err);
      setMintingStatus(`Mint failed: ${err.message}`);
      throw err;
    } finally {
      setIsMinting(false);
    }
  };
  
  
  

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (checkInCode.toLowerCase() === "solana") {
      const eventData = {
        eventId: 8,  // <-- set the appropriate event ID here
        title: "Solana Summit",
        description: "Exclusive NFT badge for Web3 Developer Meetup attendees",
        date: "June 20, 2025",
        time: "6:00",
        location: "New Delhi",
        maxAttendees: 200,
        base64Image: "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", // shorten for clarity
      };

      try {
        const userAddress = ethereum.address;
        const txHash = await mintNFTOnChain(userAddress, eventData.eventId);

        setCheckedInEvent({ ...eventData, userAddress });
        setIsCheckedIn(true);
      } catch {
        // user-facing error already via mintNFTOnChain
      }
    } else {
      setMintingStatus("Invalid check-in code");
    }
  };

  

  const simulateQRScan = async () => {
    const eventData = {
      title: "NFT Art Exhibition",
      description: "Exclusive NFT badge for NFT Art Exhibition attendees",
      badgeEmoji: "🎨",
      date: "Dec 20, 2024",
      time: "14:00",
      location: "Art Gallery, Main Street",
      maxAttendees: 50,
      base64Image: "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" // Replace with actual base64 image
    };

    try {
      if (typeof window.ethereum !== 'undefined') {
        const userAddress = ethereum.address;
        if (!userAddress) {
          alert("Please connect your Civic wallet first");
          return;
        }

        await mintNFTToUser(userAddress, eventData);
        
        setCheckedInEvent({
          ...eventData,
          userAddress: userAddress
        });
        setIsCheckedIn(true);
      } else {
        alert("Civic wallet not detected");
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Check-in failed. Please try again.");
    }
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
                CivicConnect
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
                <h3 className="font-semibold text-gray-700 mb-4">Your NFT Badge</h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="text-5xl mb-3">{checkedInEvent.badgeEmoji}</div>
                  <div className="font-medium text-gray-700">{checkedInEvent.title}</div>
                  <div className="text-sm text-gray-500 mt-1">Attendance Badge</div>
                  <div className="text-xs text-gray-400 mt-2">{checkedInEvent.date}</div>
                </div>
                
                {/* Wallet Address */}
                <div className="bg-white/50 rounded-xl p-4 mb-4">
                  <div className="text-xs text-gray-500 mb-1">Minted to Wallet</div>
                  <code className="text-xs font-mono text-gray-700">
                    {checkedInEvent.userAddress ? 
                      `${checkedInEvent.userAddress.slice(0, 6)}...${checkedInEvent.userAddress.slice(-4)}` 
                      : 'Loading...'}
                  </code>
                </div>

                {/* Transaction Hash */}
                {transactionHash && (
                  <div className="bg-white/50 rounded-xl p-4">
                    <div className="text-xs text-gray-500 mb-1">Transaction Hash</div>
                    <code className="text-xs font-mono text-gray-700">
                      {`${transactionHash.slice(0, 6)}...${transactionHash.slice(-4)}`}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12">
                View My Badges
              </Button>
              <Button variant="outline" className="w-full rounded-xl border-gray-200 h-12">
                Discover More Events
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsCheckedIn(false);
                  setCheckedInEvent(null);
                  setCheckInCode("");
                  setTransactionHash("");
                  setMintingStatus("");
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CivicConnect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="rounded-full">
                Browse Events
              </Button>
              <Button variant="ghost" className="rounded-full">
                Profile
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
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

          {/* Minting Status */}
          {isMinting && (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-6">
              <CardContent className="p-6 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-blue-700 mb-2">Minting Your NFT Badge</h3>
                <p className="text-sm text-blue-600">{mintingStatus}</p>
              </CardContent>
            </Card>
          )}

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
                  disabled={isMinting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 disabled:opacity-50"
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
          disabled={isMinting}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isMinting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 disabled:opacity-50"
      >
        {isMinting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Minting NFT...
          </>
        ) : (
          'Check In'
        )}
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
                  <p>• Make sure your Civic wallet is connected</p>
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