import express from "express";
import userRouter from "./user";
import calendarRouter from "./calendar";
import meetRouter from "./meet";

const router = express.Router();

router.use("/user", userRouter);
router.use("/calendar", calendarRouter);
router.use("/meet", meetRouter);
export default router;
