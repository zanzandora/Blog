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

    // Tạo user nếu chưa có
    const existingUser = await userModel.findOne({ clerkUserId: id });
    if (!existingUser) {
      await userModel.create({
        clerkUserId: id,
        email: email,
        username:
          `${first_name || ''} ${last_name || ''}`.trim() ||
          username ||
          `user-${Date.now()}`,
        img: profile_image_url,
      });
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
