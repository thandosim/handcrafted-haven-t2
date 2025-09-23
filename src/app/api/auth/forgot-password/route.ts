// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();
  
  await connectDB();
  const user = await User.findOne({ email });
  
  if (user) {
    // Generate reset token (1 hour expiry)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    
    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpiry
    });
    
    // Send email (implement sendEmail function)
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`
    });
  }
  
  // Always return success to prevent email enumeration
  return NextResponse.json({ 
    message: "If an account exists with this email, you will receive a password reset link." 
  });
}