const express = require("express")
const dotenv = require("dotenv").config()
const cors = require('cors')

const dbConnect = require("./src/db")
const userRouter = require("./src/routers/userRouter")

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',userRouter)

dbConnect()

app.get('/',(req,res)=>{
    res.send("Hello Express")
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server running : http://localhost:${port}`);
})