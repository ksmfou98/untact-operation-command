import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";
import * as userCtrl from "./user.ctrl";

const router = express.Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/logout",userCtrl.logout);
router.post("/addFriend", checkLoggedIn, userCtrl.addFriend);
router.delete("/deleteFriend/:friendId", checkLoggedIn, userCtrl.deleteFriend);
router.get("/readFriendList", checkLoggedIn, userCtrl.readFriendList);
router.post("/uploadImg", userCtrl.uploadImg);

export default router;
