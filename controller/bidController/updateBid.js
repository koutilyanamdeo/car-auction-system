const bidModel = require("../../model/bidModel");
const carModel = require("../../model/carModel");
const dealerModel = require("../../model/dealerModel");

const updateBid = async (req, res) => {
    try {
        // const { id } = req.params;
        const { id, bidAmount } = req.body;

        if (typeof bidAmount !== 'number' || bidAmount <= 0) {
            return res.status(400).json({ message: 'Bid amount must be a positive number' });
        }

        const bid = await bidModel.findOne({ bidId: id });
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        const auction = await carModel.findOne({ carId: bid.auction });
        if (!auction) {
            return res.status(404).json({ message: 'Associated auction not found' });
        }
        if (auction.status !== 'ACTIVE') {
            return res.status(400).json({ message: 'Bids can only be updated on active auctions.' });
        }

        // Find the current highest bid for this auction
        const highestBid = await bidModel.findOne({ auction: bid.auction }).sort({ bidAmount: -1 });
        const currentPrice = highestBid ? highestBid.bidAmount : auction.startPrice;

        if (bidAmount <= currentPrice) {
            return res.status(400).json({ message: `Your updated bid must be higher than the current price of ₹${currentPrice}.` });
        }

        bid.bidAmount = bidAmount;
        await bid.save();

        res.status(200).json({ message: 'Bid updated successfully', bid });
    } catch (error) {
        console.error('Error updating bid:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = updateBid;