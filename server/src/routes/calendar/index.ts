import express from "express";
import * as scheduleCtrl from "./calendar";

const router = express.Router();

router.post("/createSchedule", scheduleCtrl.createSchedule);
router.post("/readSchedule", scheduleCtrl.readSchedule);
export default router;
