import mongoose from "mongoose";
import dns from "dns"

dns.setServers(["1.1.1.1","8.8.8.8"])

const connctDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 })
        console.log("connected to database")
    }catch (err){
        console.log("Database connection failed:", err.message);
        process.exit(1);
    }
}

export default connctDB;