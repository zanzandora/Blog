import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isFeature: {
      type: Boolean,
      default: false,
    },
    visit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

export default mongoose.model('post', postSchema);
