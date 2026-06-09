import express from "express";

import {
  saveUser,
  sendMessage,
  getMessages,
  adminReply,
  getUsers,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/save-user", saveUser);
router.post("/send-message", sendMessage);
router.get("/messages/:email", getMessages);
router.post("/admin-reply", adminReply);
router.get("/users", getUsers);

export default router;