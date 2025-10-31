const auctionModel = require('../../model/auctionModel');
const carModel = require('../../model/carModel');

const createAuction = async (req, res) => {
    try {
        const { carId, startPrice, endTime } = req.body;
        if (!carId || !startPrice || !endTime) {
            return res.status(400).json({ message: 'carId, startPrice, and endTime are required' });
        }
        const car = await carModel.findOne({ carId });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const newAuction = new auctionModel({
            car: car._id,
            startPrice,
            endTime,
            status: 'ACTIVE'
        });
        await newAuction.save();
        res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
    } catch (error) {
        console.error('Error creating auction:', error);
        res.status(500).json({ message: 'Internal server error' });                 
    }};
    
module.exports = createAuction;