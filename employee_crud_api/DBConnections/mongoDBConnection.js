// ~/DBConnections/mongoDBConnection.js
// Configure access to the database.
const mongoose = require("mongoose");
require("dotenv").config();

connectMongoDB = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB Connected.");
      })
      .catch((err) => {
        console.log(err);
      });
    const client = mongoose.connection.getClient();
    const clientDB = client.db(process.env.MONGODB_NAME);
    return clientDB;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectMongoDB };