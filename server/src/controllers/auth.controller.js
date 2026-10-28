import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { catchAsync } from '../utils/catchAsync.js'

const options = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

export const signup = catchAsync( async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 charactetr" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    return res.status(200).json({ messgae: "User registered successfully" });
  }
});

export const login = catchAsync( async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User LogedIn successfully", user: user });
});

export const logout = catchAsync( async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logout successfully" });
});

export const validateAuth = catchAsync( async (req, res) => {
  return res.status(200).json(req.user);
});
