import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webfuel";
console.log(MONGODB_URI);

const connectDb = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState !== 1) {
    // Using new database connection
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      connectWithNoPrimary: true
    });
  }
  return handler(req, res);
};
export default connectDb;
