import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import mongDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js";

const app = express();
    dotenv.config();
mongDB();


app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());


app.use("/api/v1/auth",router)
app.use("/api/v1/income",incomeRouter)
app.use("/api/v1/expense",expenseRouter)
app.use("/api/v1/dashobard",dashboardRoute)



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;