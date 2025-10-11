const auctionModel = require('../../model/auctionModel');

const placeAuctionBid = async (req, res) => {
    try {
        const { auctionId, bidAmount } = req.body;
        if (!auctionId || !bidAmount) {
            return res.status(400).json({ message: 'auctionId and bidAmount are required' });
        }
        const auction = await auctionModel.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        if (auction.status !== 'ACTIVE') {
            return res.status(400).json({ message: 'Bids can only be placed on active auctions.' });
        }
        
        // Find the current highest bid for this auction
        const highestBid = await Bid.findOne({ auction: auctionId }).sort({ bidAmount: -1 });   
        const currentPrice = highestBid ? highestBid.bidAmount : auction.startPrice;
        
        if (bidAmount <= currentPrice) {
            return res.status(400).json({ message: `Your bid must be higher than the current price of ₹${currentPrice}.` });
        }   
        const newBid = new Bid({
            auction: auctionId,
            dealer: dealerId,
            bidAmount
        });
        await newBid.save();
        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    }
    catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = placeAuctionBid;