import mongoose from "mongoose";

const twitteSchema = new mongoose.Schema(
  {
    Like: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Twitte = mongoose.model("Twitte", twitteSchema);
