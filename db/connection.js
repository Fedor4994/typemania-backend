import mongoose from "mongoose";

const uriDb = process.env.MONGO_URL;
mongoose.set("strictQuery", false);

const connection = mongoose.connect(uriDb);

export default connection;
