import mongoose from 'mongoose';

const MONGOOSE_SECRET = process.env.MONGOOSE_SECRET;

if (!MONGOOSE_SECRET) {
    throw new Error('Please add your Mongo URI to .env.local');
}

async function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGOOSE_SECRET);
    }
}

export default dbConnect;

