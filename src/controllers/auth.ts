import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const getCurrentUser = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: "user_001",
      email: "user@example.com",
      name: "John Doe",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Email, password, and name are required" }
    });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Password needs to be at least 8 characters" }
    });
    return;
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).json({
      success: false,
      data: null,
      error: { message: "Email already exists" }
    });
    return;
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedpassword,
    name,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { password: _pw, ...userData } = newUser.toObject();
  res.status(201).json({
    success: true,
    data: {
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
    error: null
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Email and password are required" }
    });
    return;
  }
const user = await User.findOne({ email });
if (!user) {
  res.status(401).json({
    success: false,
    data: null,
    error: { message: "Invalid email or password" }
  });
  return;
}

const isValid = await bcrypt.compare(password, user.password);
if (!isValid) {
  res.status(401).json({
    success: false,
    data: null,
    error: { message: "Invalid email or password" }
  });
  return;
}
  const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET as string,
  { expiresIn: '1h' }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { password: _pw, ...userData } = user.toObject();

res.status(200).json({
  success: true,
  data: { 
    token,
    user:{
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    },
  error: null
});
};