import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { 
    currentTime: () => Date.now() + 19800000 // IST timezone offset in milliseconds (19800000 ms = 5 hours 30 minutes)
  }  }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
