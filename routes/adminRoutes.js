import express from "express";

import {
  adminLogin,
  getAllUsers,
  getUserMessages,
  adminReply,
  clearChat,
  deleteChat,
  deleteUser,
  deleteMessage,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get(
  "/users",
  authMiddleware,
  getAllUsers
);

router.get(
  "/messages/:email",
  authMiddleware,
  getUserMessages
);

router.post(
  "/reply",
  authMiddleware,
  adminReply
);

router.delete(
  "/clear-chat/:email",
  authMiddleware,
  clearChat
);

router.delete(
  "/delete-chat/:email",
  authMiddleware,
  deleteChat
);

router.delete(
  "/delete-user/:email",
  authMiddleware,
  deleteUser
);

router.delete(
  "/delete-message/:id",
  authMiddleware,
  deleteMessage
);

export default router;