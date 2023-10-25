import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://saxenaneelo122:nn5689nn@cluster0.imocjjb.mongodb.net/";

  (await mongoose.connect(connectionUrl, configOptions))
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(`Not connected ${err.message}`));
};

export default connectToDB;
