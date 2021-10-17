import express from "express";
import checkLoggedIn from "../../lib/checkLoggedIn";
import * as userCtrl from "./user.ctrl";

const router = express.Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/logout", checkLoggedIn, userCtrl.logout);
router.patch("/updateUserInfo", userCtrl.updateUserInfo);
router.post("/addFriend", checkLoggedIn, userCtrl.addFriend);
router.delete("/deleteFriend/:friendId", checkLoggedIn, userCtrl.deleteFriend);
router.get("/readFriendList", checkLoggedIn, userCtrl.readFriendList);
router.post("/uploadImg", userCtrl.uploadImg);
router.get(
  "/searchFriendEmail/:friendEmail",
  checkLoggedIn,
  userCtrl.searchFriendEmail
);
router.post("/googleRegister", userCtrl.googleRegister);

export default router;
