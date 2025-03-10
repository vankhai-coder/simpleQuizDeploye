import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        console.log('connecting to db ...');
        const conn = await mongoose.connect(process.env.MONGO_URI )
        console.log(`Connect to mongodb successully : ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error when connect to db : ${error.message}`);
        process.exit(1)
    }
}

export { connectDB }