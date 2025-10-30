import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import getDashboardData from "../controller/dashboardController.js";



const dashboardRoute = Router();

dashboardRoute.get("/get", protect, getDashboardData);

export default dashboardRoute;