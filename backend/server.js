import express from "express";
import "dotenv/config";
import products from "./data/products.js";
import cors from "cors";
import { connectDb } from "./util/database.js";
import productRoute from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());

const port = process.env.PORT; // to get the port number where server is running....

// Fetch all products or a selected product form a the database...
// I have used filtering route feature. If a router matches /product, then only it will go to productRoute to get the data...
app.use("/products", productRoute);


// Error Handling :==================================================================
app.use(notFound);
app.use(errorHandler); // here I have overwritten the Global special error handling middleware provided by Express


// mongoose and server connection code================================================
connectDb(() => {
  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});

// DONT CONNECT MONGODB MANUALLY. DO IT WITH THE HELP OF MONGOOSE

// mongoConnect(() => {
//     app.listen(port, () => {
//         console.log(`Server is up and running on port ${port}`);
//     })
// })
