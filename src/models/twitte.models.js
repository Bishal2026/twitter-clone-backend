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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDetails: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Twitte = mongoose.model("Twitte", twitteSchema);
