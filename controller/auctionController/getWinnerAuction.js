const bidModel = require('../../model/bidModel');
const auctionModel = require('../../model/auctionModel');

const getWinnerAuction = async (req, res) => {
    try {
        const { auctionId } = req.params;
        
        // Find the auction by ID
        const auction = await auctionModel.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        
        // Find the highest bid for this auction
        const highestBid = await bidModel.findOne({ auction: auctionId }).sort({ bidAmount: -1 });
        if (!highestBid) {
            return res.status(404).json({ message: 'No bids found for this auction' });
        }
        
        res.status(200).json({ 
            message: 'Winner bid fetched successfully', 
            winnerBid: highestBid 
        });
    } catch (error) {
        console.error('Error fetching winner bid:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getWinnerAuction;