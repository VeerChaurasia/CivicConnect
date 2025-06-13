// backend/api/checkin-event.js
const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const EventBadgeNFT = require('../abi/EventBadgeNFT.json');
require('dotenv').config();


const CONTRACT_ADDRESS = "0xB0Ee4A25b92E52011E8388FD56943B8B8A3Aa5cF";
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

// Make sure PRIVATE_KEY is loaded
if (!process.env.PRIVATE_KEY) {
  console.error("❌ PRIVATE_KEY not found in environment variables");
  process.exit(1);
}
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

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// This handles POST requests to /api/checkin
router.post('/', async (req, res) => {
    console.log("➡️ Received checkin request:", req.body);
    
    const { userAddress, eventId } = req.body;
  
    console.log("➡️ Received mint request for address:", userAddress, "eventId:", eventId);
  
    if (!userAddress || eventId === undefined) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing userAddress or eventId" });
    }

    // Validate Ethereum address
    if (!ethers.isAddress(userAddress)) {
      console.log("❌ Invalid Ethereum address");
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }
  
    try {
      console.log("🔗 Creating contract instance...");
      
      // Check if ABI is properly loaded
      const abi = getABI();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
        
      console.log("📝 Calling mintExistingEventNFT...");
      const tx = await contract.mintExistingEventNFT(eventId, userAddress);
      
      console.log("⏳ Waiting for transaction confirmation...");
      const receipt = await tx.wait();
      
      console.log("✅ Transaction confirmed:", receipt.transactionHash);
      
      return res.status(200).json({ 
        txHash: receipt.transactionHash,
        success: true,
        eventId: eventId,
        userAddress: userAddress
      });
      
    } catch (err) {
      console.error("❌ Minting error:", err);
      
      // Provide more specific error messages
      let errorMessage = "Unknown error occurred";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.reason) {
        errorMessage = err.reason;
      }
      
      return res.status(500).json({ 
        error: errorMessage,
        details: err.code || "UNKNOWN_ERROR"
      });
    }
});

module.exports = router;