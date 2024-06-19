const mongoose = require("mongoose")

const dbConnect = async() =>{
    try {
       await  mongoose.connect(process.env.DB_URL)
       console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failure",error);
    }
}

module.exports = dbConnect