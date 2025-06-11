import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Calendar, MapPin, Users, ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "./EventContext"; // Import the context
import EventBadgeNFT from "../abi/EventBadgeNFT.json"; // ABI JSON

const CONTRACT_ADDRESS = "0xB0Ee4A25b92E52011E8388FD56943B8B8A3Aa5cF";

// Handle different ABI import formats
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

const CreateEvent = () => {
  const { addEvent } = useEvents(); // Use the context
  const navigate = useNavigate(); // For navigation after creating event
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    badgeEmoji: "🎯",
    imageFile: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const [deployOnChain, setDeployOnChain] = useState(true); // Toggle for blockchain deployment

  const badgeOptions = ["🎯", "🎨", "⚡", "💰", "🏛️", "🚀", "🌟", "🔥", "💎", "🎵"];

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });

  const compressImage = (file: File): Promise<File> =>
    new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Resize image if too large
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.7); // 70% quality
      };
      
      img.src = URL.createObjectURL(file);
    });

  const deployToBlockchain = async () => {
    const { title, description, date, time, location, maxAttendees, imageFile } = formData;

    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it to proceed.");
      return false;
    }

    try {
      let base64Image = "";
      if (imageFile) {
        const compressedFile = await compressImage(imageFile);
        base64Image = await toBase64(compressedFile);
      }
      
      // Validate image size (limit to ~500KB base64)
      if (base64Image && base64Image.length > 700000) {
        alert("Image too large. Please use an image smaller than 500KB.");
        return false;
      }

      // Updated for ethers v6
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, getABI(), signer);

      // Estimate gas first to catch issues early
      try {
        const gasEstimate = await contract.createEventAndMint.estimateGas(
          address,
          title,
          description,
          date,
          time,
          location,
          parseInt(maxAttendees) || 1,
          base64Image
        );
        console.log("Estimated gas:", gasEstimate.toString());
        
        // If gas estimate is too high, warn user
        if (gasEstimate > 5000000) {
          const proceed = confirm(`High gas cost detected (${gasEstimate.toString()}). This might be expensive. Continue?`);
          if (!proceed) return false;
        }
      } catch (gasError) {
        console.error("Gas estimation failed:", gasError);
        
        // Try to get more specific error info
        try {
          await contract.createEventAndMint.staticCall(
            address,
            title,
            description,
            date,
            time,
            location,
            parseInt(maxAttendees) || 1,
            base64Image
          );
        } catch (staticError) {
          console.error("Static call error:", staticError);
          alert(`Contract call would fail: ${staticError.message || 'Unknown error'}`);
          return false;
        }
        
        throw new Error("Transaction would fail. Please check your inputs or contract state.");
      }

      console.log("Transaction parameters:", {
        address,
        title,
        description,
        date,
        time,
        location,
        maxAttendees: parseInt(maxAttendees) || 1,
        imageLength: base64Image.length
      });

      // Execute transaction with increased gas limit
      const tx = await contract.createEventAndMint(
        address,
        title,
        description,
        date,
        time,
        location,
        parseInt(maxAttendees) || 1,
        base64Image,
        {
          gasLimit: Math.min(10000000, Math.floor(Number(await contract.createEventAndMint.estimateGas(
            address,
            title,
            description,
            date,
            time,
            location,
            parseInt(maxAttendees) || 1,
            base64Image
          )) * 1.2)), // 20% buffer
        }
      );

      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      return true;
    } catch (error) {
      console.error("Error creating event on blockchain:", error);
      alert("❌ Failed to deploy event to blockchain. Event will be saved locally.");
      return false;
    }
  };

  const handleSubmit = async () => {
    const { title, description, date, time, location, maxAttendees } = formData;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !maxAttendees) {
      alert("Please fill in all required fields");
      return;
    }

    // Additional validation
    if (title.length > 100) {
      alert("Event title must be less than 100 characters.");
      return;
    }

    if (description.length > 500) {
      alert("Description must be less than 500 characters.");
      return;
    }

    const maxAttendeesNum = parseInt(maxAttendees);
    if (isNaN(maxAttendeesNum) || maxAttendeesNum < 1 || maxAttendeesNum > 10000) {
      alert("Max attendees must be a number between 1 and 10,000.");
      return;
    }

    // Validate date format and ensure it's not in the past
    const eventDate = new Date(`${date}T${time}`);
    if (eventDate < new Date()) {
      alert("Event date must be in the future.");
      return;
    }

    setUploading(true);

    let blockchainSuccess = false;
    
    // Deploy to blockchain if enabled
    if (deployOnChain) {
      blockchainSuccess = await deployToBlockchain();
    }

    // Always save to local dashboard (context)
    addEvent({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      maxAttendees: parseInt(formData.maxAttendees),
      badgeEmoji: formData.badgeEmoji,
      onChain: blockchainSuccess
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      badgeEmoji: "🎯",
      imageFile: null,
    });

    setUploading(false);

    // Show success message based on deployment result
    if (deployOnChain && blockchainSuccess) {
      alert("✅ Event created and deployed to blockchain with NFT minting! 🎉");
    } else if (deployOnChain && !blockchainSuccess) {
      alert("⚠️ Event created locally, but blockchain deployment failed. You can retry later.");
    } else {
      alert("✅ Event created successfully! 🎉");
    }
    
    navigate("/events");
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

          {/* Deployment Options */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Blockchain Deployment</h3>
                    <p className="text-sm text-gray-600">Deploy event with NFT minting capability</p>
                  </div>
                </div>
                <Button
                  variant={deployOnChain ? "default" : "outline"}
                  onClick={() => setDeployOnChain(!deployOnChain)}
                  className={deployOnChain ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                >
                  {deployOnChain ? "Enabled" : "Disabled"}
                </Button>
              </div>
              {!deployOnChain && (
                <p className="text-sm text-amber-600 mt-3 bg-amber-50 p-3 rounded-lg">
                  ⚠️ Event will only be saved locally. Enable blockchain deployment for NFT features.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Event Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-center">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
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
                  />
                </div>

                {/* Image Upload (for blockchain deployment) */}
                {deployOnChain && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Event Badge Image (optional)
                    </Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange("imageFile", e.target.files?.[0] || null)}
                      className="border-0 bg-gray-50 rounded-xl h-12"
                    />
                    <p className="text-sm text-gray-500">
                      This image will be included in the NFT badges. Max size: 500KB
                    </p>
                  </div>
                )}

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
                    <div className="text-xs text-gray-500 mt-1">
                      {deployOnChain ? "NFT Badge" : "Event Badge"}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl h-12 text-lg font-medium"
                    disabled={uploading}
                  >
                    {uploading 
                      ? "Creating..." 
                      : deployOnChain 
                        ? "Create Event & Deploy NFTs" 
                        : "Create Event"
                    }
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;