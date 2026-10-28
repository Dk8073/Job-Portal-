import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    savedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job"
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
};

export const User = model("User", userSchema)