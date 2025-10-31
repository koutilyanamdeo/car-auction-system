
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'VEHICLE_AUCTION_SYSTEM';

const generateAuctionToken = (auctionId, dealerId) => {
    const payload = {
        auctionId,
        dealerId
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });
    return token;
};

module.exports = generateAuctionToken;
