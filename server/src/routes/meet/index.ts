import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";

import * as meetCtrl from "./meet.ctrl";

const router = express.Router();

router.post("/create", checkLoggedIn, meetCtrl.createMeet); // 미팅 생성
router.post("/uploadMeetThumb", meetCtrl.uploadMeetThumb); // 미팅 썸네일 업로드
router.get("/readMeetList", meetCtrl.readMeetList); // 미팅 목록 조회

export default router;
