const carModel = require('../../model/carModel');

const createCar = async (req, res) => {
    try {
        const { carId, make, model, year } = req.body;
        
        // Validate required fields
        if (!carId || !make || !model || !year) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof make !== 'string' || make.length < 2) {
            return res.status(400).json({ message: 'Make must be a string with at least 2 characters' });
        }
        if (typeof model !== 'string' || model.length < 1) {
            return res.status(400).json({ message: 'Model must be a string with at least 1 character' });
        }
        if (typeof year !== 'number' || year < 2000 || year > new Date().getFullYear() + 1) {
            return res.status(400).json({ message: 'Year must be a valid number between 1886 and next year' });
        }
        // Check for unique carId
        const existingCar = await carModel.findOne({ carId });
        if (existingCar) {
            return res.status(409).json({ message: 'Car with this ID already exists' });
        }

        // Create new car
        const newCar = new carModel({ carId, make, model, year });
        await newCar.save();    
        res.status(201).json({ message: 'Car created successfully', car: newCar });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createCar;