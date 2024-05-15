import express from "express";
import { CreateUser,FindUser,GetUserByEmail,GetUserByID} from "../controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/signup", CreateUser);
UserRouter.post("/login", FindUser);
UserRouter.get("/GetUserByID/:id", GetUserByID);
UserRouter.get("/GetLoggedUser/:email", GetUserByEmail);
export default UserRouter;