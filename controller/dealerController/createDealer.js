const dealerModel = require('../../model/dealerModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
// const secretKey = process.env.JWT_SECRET || 'VEHICLE_AUCTION_SYSTEM';
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const createDealer = async (req, res) => {
    try {
        const { name, email, password, dealerId } = req.body;
        const existingDealer = await dealerMoel.find({ email });
        if(!name || !email || !password || !dealerId){
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: 'Password must be a string with at least 6 characters' });
        }
        if (typeof email !== 'string' || email.length < 5) {
            return res.status(400).json({ message: 'Email must be a string with at least 5 characters' });
        }
        if(!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (existingDealer.length > 0) {
            return res.status(400).json({ message: 'Dealer with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = { name, email, password: hashedPassword, dealerId };
        const newDealer = new dealerModel(newUser);
        await newDealer.save();
        res.status(201).json({ message: 'Dealer created successfully', dealer: newDealer });
    } catch (error) {
        console.error('Error creating dealer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createDealer;