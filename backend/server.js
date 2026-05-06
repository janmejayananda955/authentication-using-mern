import app from "./src/app.js"
import dotenv from "dotenv";
import dns from "node:dns";
import connctDB from "./src/config/database.js";

dotenv.config();
dns.setDefaultResultOrder('ipv4first');
connctDB(); 
 
app.listen(3000,()=>{
    console.log("server is running on port: 3000")
})

