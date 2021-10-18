import express from "express";
import checkAdmin from "../../lib/checkAdmin";
import checkLoggedIn from "../../lib/checkLoggedIn";
import * as calendarCtrl from "./calendar.ctrl";

const router = express.Router();

router.post(
  "/createSchedule",
  checkLoggedIn,
  checkAdmin,
  calendarCtrl.createSchedule
);
router.get("/readSchedule", calendarCtrl.readSchedule);
router.get("/readScheduleDetail/:scheduleId", calendarCtrl.readScheduleDetail);
router.patch(
  "/updateSchedule",
  checkLoggedIn,
  checkAdmin,
  calendarCtrl.updateSchedule
);
router.delete(
  "/deleteSchedule/:scheduleId",
  checkLoggedIn,
  checkAdmin,
  calendarCtrl.deleteSchedule
);
export default router;
