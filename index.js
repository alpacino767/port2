import express from "express"
import "express-async-errors"
import connectDB from "./db/connect.js"
import morgan from "morgan"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import errorHandlerMiddleware from "./middleware/error-handler.js"


import cookieParser from "cookie-parser"

const app = express()

// if(process.env.NODE_ENV !== "production"){
//     app.use(morgan("dev"))
// }

const __dirname = dirname(fileURLToPath(import.meta.url));

// for deployment
app.use(express.static(path.resolve(__dirname, './client/build')))

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false}))

//  auth
import authRouter from "./routes/authRoutes.js"




app.use(express.json())
app.use(cookieParser())




app.get('/', (req, res) => {
    res.json({ msg: "Welcome"})
})

app.get('/api/v1', (req, res) => {
    res.json({ msg: "API"})
})




const port = process.env.PORT || 8000

app.use("/api/v1/auth", authRouter)

// for deployment
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

app.use(errorHandlerMiddleware)



const start = async () => {
    console.log("start");
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {

           console.log(`Server is running on ${port}...`);
        })
    } catch (error) {
        (error);
    }
}

start()