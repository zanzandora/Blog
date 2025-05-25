import { transporter } from '@/utils/mailer';
import { NextFunction, Request, Response } from 'express';

export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res
        .status(400)
        .json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_RECEIVER,
      subject: `You have new message from: ${name}`,
      text: `${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Lỗi khi gửi email:', err);
        return res.status(500).send('Đã xảy lỗi khi gửi email');
      }

      console.log('Email đã được gửi:', info.response);
      return res.status(200).json({ message: 'Email đã được gửi thành công.' });
    });
  } catch (error) {
    next();
  }
};
