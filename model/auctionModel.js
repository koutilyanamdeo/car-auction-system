const mongoose = require('mongoose');
const {Schema} = mongoose;

const auctionSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    startPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    reservePrice: {
        type: Number,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum:['SCHEDULED', 'ACTIVE', 'ENDED', 'CANCELLED'],
        default: 'SCHEDULED',
    },
    winningBid: {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
    },
}, {timestamps: true});    

const AuctionModel = mongoose.model('Auction', auctionSchema);
module.exports = AuctionModel;