const mongoose = require('mongoose');

const connectDB = async (uri) => {

	if (!uri) {
		throw new Error("Mongo_URI is not defined");
	}
	mongoose.set("strictQuery", true);

	mongoose.connection.on("connected", () => {
		console.log("MongoDB Connected...");
	})
	mongoose.connection.on("reconnected", () => {
		console.log("MongoDB Reconnected...");
	})
	mongoose.connection.on("disconected", () => {
		console.warn("MongoDB Disconnected...");
	})
	mongoose.connection.on("error", (err) => {
		console.error("MongoDB Connection Error:", err);
	})

	mongoose.connect(uri);
}

module.exports = connectDB
