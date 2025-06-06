import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  secure: true,
  auth: {
    user: process.env.MAIL_RECEIVER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
