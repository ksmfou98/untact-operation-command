import express from "express";
import userRouter from "./user";
import calendarRouter from "./calendar";
const router = express.Router();

router.use("/user", userRouter);
router.use("/calendar", calendarRouter);
export default router;
