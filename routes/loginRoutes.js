import express from "express";
import * as loginController from "../controllers/loginController.js";
import passport from "passport";

const router = express.Router();

router.get("/", loginController.loginGetController);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  loginController.loginPostController
);

export default router;
