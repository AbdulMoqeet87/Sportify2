import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./error/error.js";
import movieRoutes from "./routes/movieRoutes.js";
import reservationRouter from "./routes/reservationRoute.js";
import GroundOwnerRouter from "./routes/GroundOwnerRoute.js";
import UserRouter from "./routes/UserRoute.js";


const app = express();
app.use(express.json());


app.use(cors({
    origin: "http://localhost:3000",
    methods:["POST","GET","PATCH"],
    credentials:true,
}));

dotenv.config({path:"./config/config.env"});

app.use(express.urlencoded({extended:true}));

app.use("/movies", movieRoutes);
app.use("/reservation", reservationRouter);
app.use("/GroundOwner", GroundOwnerRouter);
app.use("/User",UserRouter)

dbConnection();
app.use(errorMiddleware)
export default app; 