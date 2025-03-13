import mongoose from "mongoose";
import 'dotenv/config';

export const connectDb = async (callback) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to : ${conn.connection.name}`);
        callback(); // this callback is for connecting server...
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1); //forcing the Node.js process to stop instead of continuing with a broken state...

        // Retry connection after 5 seconds instead of exiting...
        setTimeout(() => {
            connectDb(callback);
        }, 5000);
    }
}


// ---------------------------------------------------------------------------------------
// NO NEED TO MANUALLY CONNECT MONGODB ANYMORE. JUST USE MONGOOSE...

// import mongodb from 'mongodb';

// const MongoClient = mongodb.MongoClient;

// let _db; //at first it is undefined...

// export const mongoConnect = async (callback) => {
//     try {
//         // you will get this client object once connection is successful.!!
//         const client = await MongoClient.connect('mongodb+srv://adhikarinilay:e6jcrqgXHokAdnuO@ecommercedatabase.zdts1.mongodb.net/eCommerceDataBase?retryWrites=true&w=majority&appName=eCommerceDataBase');

//         _db = client.db(); // it will give the database = ecommercedatabase
//         //if you put _db = client.db('test') then the prev database will be overwritten by test database and if test database doesn't exist then it will be created when user try to add the data...

//         console.log('Connected to MongoDB');
//         callback(); 
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// // This is to serve my database accross different files that need to put data there!!
// export const getDb = () => {
//     if(_db){
//         return _db;
//     }
//     throw 'No database found!!';
// }