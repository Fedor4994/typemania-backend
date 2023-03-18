import mongoose from "mongoose";

const uriDb = process.env.MONGO_URL;
console.log(uriDb);
mongoose.set("strictQuery", false);

const connection = mongoose.connect(uriDb);

export default connection;
