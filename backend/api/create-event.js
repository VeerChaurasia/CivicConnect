// backend/api/create-event.js
const express = require('express');
const { ethers } = require('ethers');
const EventBadgeNFT = require('../abi/EventBadgeNFT.json');
const router = express.Router();

const CONTRACT_ADDRESS = "0xB0Ee4A25b92E52011E8388FD56943B8B8A3Aa5cF";
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Store this in .env, not in code
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is required");
}

if (!PRIVATE_KEY.startsWith('0x') || PRIVATE_KEY.length !== 66) {
  throw new Error("Invalid private key format. Must be 66 characters starting with 0x");
}
const PROVIDER_URL = "https://eth-sepolia.public.blastapi.io";
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
router.post("/create-event", async (req, res) => {
  const { title, description, date, time, location, maxAttendees, base64Image } = req.body;

  try {
    const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, getABI(), wallet);

    const tx = await contract.createEventAndMint(
      await wallet.getAddress(),
      title,
      description,
      date,
      time,
      location,
      maxAttendees,
      base64Image
    );

    console.log("🔁 tx.hash is:", tx.hash); // ✅ This works in Ethers v6

    return res.status(200).json({
      success: true,
      txHash: tx.hash // ✅ use tx.hash, not receipt.transactionHash
    });

  } catch (err) {
    console.error("Smart contract interaction failed:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

