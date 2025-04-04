import express from "express";
import "dotenv/config";
import { connectDb } from "./utils/database.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

const app = express();

// this is done to set up connections between backend and frontend....
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", "true"); // IMPORTANT: Allow cookies
  next();
});

// Since the user has submitted using formdata, that's why I use urlEncoded() to parse formdata...
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// now to parse the jwt saved in a cookie, we need a cookie-parser to parse that cookie from request headers...
app.use(cookieParser());


// Fetch all products or a selected product form a the database...
// I have used filtering route feature. If a router matches /product, then only it will go to productRoute to get the data...
app.use("/products", productRoute);

// This middleware for user based routes
app.use('/account', userRoutes);

// This middleware for admin based routes
app.use('/admin', adminRoutes);

// This middleware for order based routes
app.use('/account/orders', orderRoutes);


// Error Handling :==================================================================
app.use(notFound);
app.use(errorHandler); // here I have overwritten the Global special error handling middleware provided by Express


// mongoose and server connection code================================================
connectDb(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port ${process.env.PORT}`);
  });
});

// DONT CONNECT MONGODB MANUALLY. DO IT WITH THE HELP OF MONGOOSE

// mongoConnect(() => {
//     app.listen(port, () => {
//         console.log(`Server is up and running on port ${port}`);
//     })
// })
