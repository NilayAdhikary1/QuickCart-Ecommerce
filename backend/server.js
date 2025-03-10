import express from 'express';
import 'dotenv/config';
import products from './data/products.js';
import cors from 'cors';
import { connectDb } from './util/database.js'

const port = process.env.PORT;

const app = express();
app.use(cors());

// Just Send a response...
app.get('/',(req, res, next) => {
    res.send("Hello world!!");
});

// Fetch all products form a backend dummy products file...
app.get('/products',(req, res) => {
    res.json(products);
});

// Fetch one product form a backend dummy products file...
app.get('/products/:productId', (req, res, next) => {
    const prod = products.find(p => p._id == req.params.productId);
    res.json(prod);
})


// DONT CONNECT MONGODB MANUALLY. DO IT WITH THE HELP OF MONGOOSE...................

// mongoConnect(() => {
//     app.listen(port, () => {
//         console.log(`Server is up and running on port ${port}`);
//     })
// })

connectDb(() => {
    app.listen(port, () => {
        console.log(`Server is up and running on port ${port}`);
    });
});

