import userModel from '@/models/user.model';
import { Webhook } from 'svix/dist/webhook';

export const clerkWebhook = async (req: any, res: any) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET || '';

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(secret);
  let evt: any;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: 'Ivalid signature',
    });
  }

  const eventType = evt.type;
  const data = evt.data;

  if (eventType === 'user.created') {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      username,
      profile_image_url,
    } = data;

    const email = email_addresses?.[0]?.email_address;
    // Tạo username duy nhất bằng cách thêm timestamp nếu cần
    let baseUsername =
      `${first_name || ''} ${last_name || ''}`.trim() ||
      username ||
      `user-${Date.now()}`;

    // Loại bỏ khoảng trắng và ký tự đặc biệt (tuỳ chỉnh theo yêu cầu)
    baseUsername = baseUsername.replace(/\s+/g, '-').toLowerCase();

    let finalUsername = baseUsername;
    let counter = 1;

    /// Kiểm tra username đã tồn tại chưa
    while (true) {
      const existingUser = await userModel.findOne({ username: finalUsername });
      if (!existingUser) break;
      finalUsername = `${baseUsername}-${counter}`;
      counter++;
    }

    // Tạo user
    try {
      await userModel.create({
        clerkUserId: id,
        email: email,
        username: finalUsername, // Sử dụng username đã kiểm tra
        img: profile_image_url,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        res
          .status(200)
          .json({ message: 'Duplicate username detected, but ignored.' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
      return;
    }

    res.status(200).json({
      message: 'clerk webhook created user successfully',
    });
  } else {
    res
      .status(200)
      .json({ message: 'Event not processed, but received successfully.' });
  }
};
