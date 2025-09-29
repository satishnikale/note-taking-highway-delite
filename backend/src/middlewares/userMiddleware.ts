const express = require("express");
const jwt = require("jsonwebtoken");

// bring in only types from express
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Extend Express Request to include userId + email
interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}

function userMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers["token"] as string; // or use 'authorization'

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id as string;
    req.email = decoded.email as string;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
}

module.exports = { userMiddleware };
