import mongoose from "mongoose";
import "dotenv/config";
const DBURL =
  process.env.DBURL ||
  "mongodb+srv://admin:test123@cafenual.3wvli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("✅ MongoDB Connected.... "))
  .catch((err) => console.log(err));
