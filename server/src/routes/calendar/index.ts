import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";
import * as calendarCtrl from "./calendar.ctrl";

const router = express.Router();

router.post("/createSchedule", checkLoggedIn, calendarCtrl.createSchedule);
router.get("/readSchedule", calendarCtrl.readSchedule);
router.get("/readScheduleDetail/:scheduleId", calendarCtrl.readScheduleDetail);
router.patch("/updateSchedule", calendarCtrl.updateSchedule);
router.delete("/deleteSchedule/:scheduleId", calendarCtrl.deleteSchedule);
export default router;
