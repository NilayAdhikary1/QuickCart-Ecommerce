import 'dotenv/config';

import { users } from "./data/users.js";
import products from "./data/products.js";
import { User } from "./models/UserModel.js";
import { Product } from "./models/ProductModel.js";
import { Order } from "./models/OrderModel.js";
import { connectDb } from "./util/database.js";

connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // In this line I have injected a new property to the product object who created it.
        const sampleProducts = products.map(prod => {
            return {...prod, user : adminUser};
        });

        // now save it to db
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    //that means you are destroying the data.
    destroyData();
} else {
    importData();
}