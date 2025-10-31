const mongoose = require('mongoose');
const Counter = require('./counterModel');

const carSchema = new mongoose.Schema({
    carId: {
        type: String,
        required: true,
        unique: true,
    },
    make: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    }
    );

// Pre-save middleware to auto-generate carId
carSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'carId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.carId = `CAR${counter.seq.toString().padStart(4, '0')}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const CarModel= mongoose.model('Car', carSchema);
module.exports = CarModel;
   