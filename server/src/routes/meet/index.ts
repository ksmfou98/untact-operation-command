import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";

import * as meetCtrl from "./meet.ctrl";

const router = express.Router();

router.post("/create", checkLoggedIn, meetCtrl.createMeet);

export default router;
