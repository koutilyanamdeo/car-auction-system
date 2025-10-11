const carModel = require('../../model/carModel');

const getAllCars = async (req, res) => {
    try {
        const cars = await carModel.find();
        res.status(200).json({ cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getAllCars;