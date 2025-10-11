const mongoose = require('mongoose');

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

const CarModel= mongoose.model('Car', carSchema);
module.exports = CarModel;
   