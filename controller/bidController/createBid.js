const Bid = require("../../model/bidModel");
const Auction = require("../../model/auctionModel"); // You will need your Auction model
const Dealer = require("../../model/dealerModel");

const createBid = async (req, res) => {
    try {
        const { auctionId, dealerId, bidAmount } = req.body;

        // 1. Validate input
        if (!auctionId || !dealerId || !bidAmount) {
            return res.status(400).json({ message: 'auctionId, dealerId, and bidAmount are required' });
        }

        // 2. Check if the auction and dealer exist using findById
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        const dealer = await Dealer.findById(dealerId);
        if (!dealer) {
            return res.status(404).json({ message: 'Dealer not found' });
        }

        // 3. Add crucial business logic
        if (auction.status !== 'ACTIVE') {
            return res.status(400).json({ message: 'Bids can only be placed on active auctions.' });
        }

        // Find the current highest bid for this auction giving -1 to sort in highest to lowest order
        const highestBid = await Bid.findOne({ auction: auctionId }).sort({ bidAmount: -1 });

        const currentPrice = highestBid ? highestBid.bidAmount : auction.startPrice;

        if (bidAmount <= currentPrice) {
            return res.status(400).json({ message: `Your bid must be higher than the current price of ₹${currentPrice}.` });
        }

        // 4. Create the new bid with the correct fields
        const newBid = new Bid({
            auction: auctionId,
            dealer: dealerId,
            bidAmount
        });
        await newBid.save();

        res.status(201).json({ message: 'Bid created successfully', bid: newBid });

    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createBid;