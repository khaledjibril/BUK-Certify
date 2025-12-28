// utils/sendUvcEmail.js
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export const sendUvcEmail = async (email, name, uvcCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });


const logoPath = path.join(__dirname, "../public/images/buklogo.webp");

  // Get absolute path for logo
 const logoCid = "buklogo123"; // Content-ID for embedding

  await transporter.sendMail({
    from: `"BUK Verification" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your UVC Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <div style="text-align: center;">
          <img src="cid:${logoCid}" alt="BUK Logo" style="width: 100px; margin-bottom: 20px;" />
        </div>
        <h1 style="color: #0b3d91; text-align: center;">BUK Verification</h1>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your verifier account has been approved successfully!</p>
        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 16px;">Here is your unique UVC code:</p>
          <h2 style="font-size: 28px; color: #0b3d91; letter-spacing: 2px;">${uvcCode}</h2>
        </div>
        <p style="text-align: center;">This code can be used up to <strong>10 times</strong> to verify certificates.</p>
        <p>Thank you for being part of our verification system.</p>
        <p style="margin-top: 40px;">Regards,<br/><strong>BUK Team</strong></p>
      </div>
    `,
    attachments: [
      {
        filename: "buklogo.webp",
        path: logoPath,
        cid: logoCid
      }
    ]
  });
};
