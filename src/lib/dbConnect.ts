import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/possigeetech_mock_db";

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var _mongooseCache: MongooseCache | undefined;
}

// In Next.js (serverless environment), we need to cache the database connection
// so that we don't create a new connection pool for every request.
let cached = global._mongooseCache;

if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
    // We already know cached is not undefined here because of the check above,
    // but TypeScript might still complain if we don't use a local reference or assertion.
    const c = cached!;

    if (c.conn) {
        return c.conn;
    }

    if (!c.promise) {
        const opts = {
            bufferCommands: false,
        };

        c.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Connected to MongoDB successfully");
            return mongoose;
        }).catch(err => {
            console.error("MongoDB connection error:", err);
            throw err;
        });
    }

    try {
        c.conn = await c.promise;
    } catch (e) {
        c.promise = null;
        throw e;
    }

    return c.conn;
}

export default dbConnect;
