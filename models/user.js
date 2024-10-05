import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passport from "passport";

const PhoneConfirmationCodeSchema = new mongoose.Schema({
  code: String,
  expiresAt: Date,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
  phoneConfirmed: {
    type: Boolean,
    default: false,
  },
  phoneCode: {
    type: PhoneConfirmationCodeSchema,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
