import "dotenv/config";
import mongoose from "mongoose";
const DBURL = process.env.DBURL;

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("✅ MongoDB Connected.... "))
  .catch((err) => console.log(err));
