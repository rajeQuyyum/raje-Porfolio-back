import User from "../models/User.js";
import Message from "../models/Message.js";

export const saveUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { userEmail, sender, message } = req.body;

    const newMessage = await Message.create({
      userEmail,
      sender,
      message,
    });

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { email } = req.params;

    const messages = await Message.find({
      userEmail: email,
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

    const reply = await Message.create({
      userEmail,
      sender: "admin",
      message,
    });

    res.json(reply);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
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