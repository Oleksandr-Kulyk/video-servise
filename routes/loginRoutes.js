import express from "express";
import * as loginController from "../controllers/loginController.js";

const router = express.Router();

router.get("/", loginController.loginGetController);
router.post("/", loginController.loginPostController);

export default router;
