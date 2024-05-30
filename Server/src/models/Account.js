import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      undefined: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Account", accountSchema);
