import express from "express";
import { CreateUser,FindUser} from "../controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/signup", CreateUser);
UserRouter.post("/login", FindUser);
export default UserRouter;