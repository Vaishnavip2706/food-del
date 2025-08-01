import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import path from "path";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config' 
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
const port = process.env.PORT || 4000;

//middleware BEFORE routes
app.use(cors());

// Only parse JSON if not uploading files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)

// Test route
app.get("/", (req, res) => res.send("API Running"));

//db connection
connectDB();

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.keepAliveTimeout = 120 * 1000;  
server.headersTimeout = 130 * 1000;  


//mongodb+srv://FoodApp:Vaish1234@cluster0.g41svct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
