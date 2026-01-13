import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { route } from './Routes/route.js';
import 'dotenv/config';
import connectDB from './Db/index.js';

const server = express();
const PORT = process.env.PORT || 8000;

// ✅ FIXED: Proper CORS configuration
server.use(cors({
  origin: ["http://localhost:5173"], // frontend URL
  credentials: true, // allow cookies / authentication
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middlewares
server.use(cookieParser());
server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true }));

// ✅ Routes
server.use("/api", route);

// ✅ Default Routes
server.get("/", (req, res) => {
  res.send("Hello to backend");
});

server.get("*", (req, res) => {
  res.status(404).send("404 NOT FOUND <a href='./'> Go To Home</a>");
});


// ✅ Connect to MongoDB and start the server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("✅ Mongoose is connected");
      console.log("✅ Server is running at " + PORT);
    });
  })
  .catch((error) => {
    console.log("❌ Error connecting to DB:", error);
  });
