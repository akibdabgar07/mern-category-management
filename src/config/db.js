const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI_DB);
    console.log(`MongoDB Connected: ${mongo.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
