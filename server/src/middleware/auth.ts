import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  try {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {return res.status(401).json({ 
    success: false,
    data: null,
    error: {message: "Unauthorized: Missing token"} });}
const token = authHeader.split(" ")[1] as string;
const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
req.user = decoded as { userId: string };
next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      data: null,
      error: {message:"Unauthorized: Invalid token" }});
  }
}
