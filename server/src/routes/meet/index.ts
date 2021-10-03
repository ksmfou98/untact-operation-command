import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";

import * as meetCtrl from "./meet.ctrl";

const router = express.Router();

router.post("/create", checkLoggedIn, meetCtrl.createMeet); // 회의 생성
router.post("/uploadMeetThumb", meetCtrl.uploadMeetThumb); // 회의 썸네일 업로드
router.get("/readMeetList", meetCtrl.readMeetList); // 회의 목록 조회
router.get("/findMeet/:meetId", checkLoggedIn, meetCtrl.findMeet); // 회의 조회

export default router;
