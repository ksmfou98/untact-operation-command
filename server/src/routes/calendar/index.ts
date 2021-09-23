import express from "express";
import * as calendarCtrl from "./calendar";

const router = express.Router();

router.post("/createSchedule", calendarCtrl.createSchedule);
router.get("/readSchedule", calendarCtrl.readSchedule);
router.patch("/updateSchedule", calendarCtrl.updateSchedule);
export default router;
