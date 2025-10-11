const jwr = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'VEHICLE_AUCTION_SYSTEM';

const JWTAuthorisation = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        const decoded = jwr.verify(token, secretKey);
        req.user = decoded; // Attach decoded user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = JWTAuthorisation;