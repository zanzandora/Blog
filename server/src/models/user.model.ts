import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savePosts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

export default mongoose.model('User', userSchema);
