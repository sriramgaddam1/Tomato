import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS setup
const allowedOrigins = [
  "https://tomatoadmin-five.vercel.app",
  "https://tomatofrontend-three.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"] // ✅ Added 'token'
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Preflight support

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
