const express = require('express');
const router = express.Router();

// car api routes
const createCar = require('../controller/carController/createCar');
const getAllCars = require('../controller/carController/fetchCars');
const getCarById = require('../controller/carController/fetchCarById');
const deleteCar = require('../controller/carController/deleteCar');

// bid api routes
const createBid = require('../controller/bidController/createBid');
const updateBid = require('../controller/bidController/updateBid');

// dealer api routes can be added here 
const createDealer = require('../controller/dealerController/createDealer');
const loginDealer = require('../controller/dealerController/loginDealer');

//auction api routes can be added here
const createAuction = require('../controller/auctionController/createAuction');
const placeAuctionBid = require('../controller/auctionController/placeAuctionBid');
const startAuction = require('../controller/auctionController/startAuction');
const generateAuctionToken = require('../controller/auctionController/generateAuctionToken');
const getWinnerAuction = require('../controller/auctionController/getWinnerAuction');

const JWTAuthorisation = require('../middleware/JWTAuthorisation');
router.post('/auction', JWTAuthorisation, createAuction);
router.post('/auction/bid',JWTAuthorisation, placeAuctionBid);
router.put('/auction/start',JWTAuthorisation, startAuction);
router.post('/auction/token', generateAuctionToken);
router.get('/auction/winner/:id',JWTAuthorisation, getWinnerAuction);

router.post('/car', createCar);
router.get('/car', getAllCars);
router.get('/car/:id', getCarById);
router.delete('/car/:id', deleteCar);

router.post('/bid', createBid);
router.put('/bid', updateBid);

router.post('/dealer', createDealer);
router.post('/dealer/login', loginDealer);



module.exports = router;