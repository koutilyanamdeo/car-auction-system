const carModel = require('../../model/carModel');

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findOne({carId: id});
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ car });
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getCarById;