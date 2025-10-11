const auctionModel = require('../../model/auctionModel');

const startAuction = async (req, res) => {
    try {
        const { auctionId } = req.body;
        if (!auctionId) {
            return res.status(400).json({ message: 'auctionId is required' });
        }
        const auction = await auctionModel.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        if (auction.status !== 'PENDING') {
            return res.status(400).json({ message: 'Only pending auctions can be started' });
        }
        auction.status = 'ACTIVE';
        await auction.save();
        res.status(200).json({ message: 'Auction started successfully', auction });
    } catch (error) {
        console.error('Error starting auction:', error);
        res.status(500).json({ message: 'Internal server error' });                 
    }};
    
module.exports = startAuction;