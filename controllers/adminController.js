import jwt from "jsonwebtoken";
import Message from "../models/Message.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("FROM FRONTEND:");
    console.log(email, password);

    console.log("FROM ENV:");
    console.log(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      userEmail: req.params.email,
    }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const adminReply = async (req, res) => {
  try {
    const { userEmail, message } = req.body;

    const newReply = await Message.create({
      userEmail,
      sender: "admin",
      message,
    });

    await sendEmail(
      userEmail,
      `Admin replied: ${message}`
    );

    res.json(newReply);
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};

export const clearChat = async (req, res) => {
  try {
    await Message.deleteMany({
      userEmail: req.params.email,
    });

    res.json({
      message: "Chat cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Message.deleteMany({
      userEmail: req.params.email,
    });

    res.json({
      message: "Chat deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      email: req.params.email,
    });

    await Message.deleteMany({
      userEmail: req.params.email,
    });

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteMessage = async (
  req,
  res
) => {
  try {
    await Message.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Message deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};