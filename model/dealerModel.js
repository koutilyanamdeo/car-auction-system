const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    auctionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction',
    },
    dealerId:{
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true});

const DealerModel = mongoose.model('Dealer', dealerSchema);
module.exports = DealerModel;