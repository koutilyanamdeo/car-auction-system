# Car Auction System

A Node.js backend API for real-time car auctions. Dealers register/login, add cars (with auto-generated IDs), create auctions, and place bids.

## Features

- **Dealer Authentication**: Register and login with JWT.
- **Car Management**: CRUD operations; auto-generated unique car IDs (e.g., CAR0001).
- **Auction Management**: Create auctions for cars with start/end times, reserve prices.
- **Bidding**: Place and update bids on active auctions.
- **Real-time Bidding**: Supports multiple dealers bidding on auctions.
- **MongoDB Integration**: Persistent storage with Mongoose.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **Dev**: Nodemon

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/koutilyanamdeo/car-auction-system.git
   cd car-auction-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/car-auction-system  # or Atlas URI
   JWT_SECRET=your_jwt_secret
   ```

4. Start MongoDB locally or set up Atlas.

## Running the Application

1. Start the server:
   ```
   npm start
   ```
   - Server runs on `http://localhost:3000`.
   - Root route: Welcome message.

## API Endpoints

All under `/api/v1`. Use JWT in `Authorization: Bearer <token>` for protected routes.

### Dealer Auth

- **POST /api/v1/dealer**: Register dealer (name, email, password).
- **POST /api/v1/dealer/login**: Login (email, password) → JWT token.

### Cars

- **POST /api/v1/car**: Create car (make, model, year) → Auto-generates carId.
- **GET /api/v1/car**: Fetch all cars.
- **GET /api/v1/car/:id**: Fetch car by ID.
- **DELETE /api/v1/car/:id**: Delete car.

### Auctions

- **POST /api/v1/auction**: Create auction (carId, startPrice, endTime).
- **PUT /api/v1/auction/start**: Start auction.
- **POST /api/v1/auction/bid**: Place bid (auctionId, bidAmount).
- **POST /api/v1/auction/token**: Generate auction token.
- **GET /api/v1/auction/winner/:id**: Get auction winner.

### Bids

- **POST /api/v1/bid**: Create bid.
- **PUT /api/v1/bid**: Update bid.

## Models

- **Car**: carId (auto), make, model, year.
- **Auction**: car (ref), startPrice, reservePrice, startTime, endTime, status, winningBid.
- **Bid**: auction (ref), dealerId (ref), bidAmount, bidTime.
- **Dealer**: name, email, password, dealerId.
- **Counter**: For auto-incrementing car IDs.

## Notes

- Car IDs auto-generated on save (CAR0001, etc.).
- Auctions have statuses: SCHEDULED, ACTIVE, ENDED, CANCELLED.
- Use Postman/Insomnia for testing APIs.
- For production: Secure JWT, validate inputs, add error handling.
- No frontend; API-only.

## License

ISC (see LICENSE).
