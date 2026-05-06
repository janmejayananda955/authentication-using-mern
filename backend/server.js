import app from "./src/app.js"
import dotenv from "dotenv";
import connctDB from "./src/config/database.js";

dotenv.config();
connctDB(); 
 
app.listen(3000,()=>{
    console.log("server is running on port: 3000")
})

