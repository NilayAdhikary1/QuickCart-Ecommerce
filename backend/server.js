import express from "express";
import "dotenv/config";
import { connectDb } from "./util/database.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

const app = express();

// this is done to set up connections between backend and frontend....
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Since the user has submitted using formdata, that's why I use urlEncoded() to parse formdata...
app.use(bodyParser.urlencoded());


// now to parse the jwt saved in a cookie, we need a cookie-parser to parse that cookie from request headers...
app.use(cookieParser());


// Fetch all products or a selected product form a the database...
// I have used filtering route feature. If a router matches /product, then only it will go to productRoute to get the data...
app.use("/products", productRoute);

// This middleware for user based routes
app.use('/account', userRoutes);

// This middleware for admin based routes
app.use('/admin/users', adminRoutes);


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
