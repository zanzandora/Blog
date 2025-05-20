import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

export default mongoose.model('comment', commentSchema);
