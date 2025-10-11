const carModel = require('../../model/carModel');

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCar = await carModel.findOneAndDelete({ carId: id });
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = deleteCar;