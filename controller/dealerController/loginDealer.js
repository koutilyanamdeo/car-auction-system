const dealerModel = require('../../model/dealerModel');
const bcrypt = require('bcrypt');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const loginDealer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: 'Password must be a string with at least 6 characters' });
        }
        if (typeof email !== 'string' || !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const dealer = await dealerModel.findOne({ email });
        if (!dealer) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, dealer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', dealer });
    } catch (error) {
        console.error('Error logging in dealer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = loginDealer;