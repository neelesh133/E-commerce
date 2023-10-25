import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = process.env.MONGO_URI;

  (await mongoose.connect(connectionUrl, configOptions))
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(`Not connected ${err.message}`));
};

export default connectToDB;
