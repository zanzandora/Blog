import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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
    category: {
      type: String,
      required: true,
      default: 'general',
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
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

postSchema.index({ title: 'text' });

export default mongoose.model('post', postSchema);
