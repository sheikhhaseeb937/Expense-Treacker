import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
   
    },
    password: {
      type: String,
      required: true,
   
    },
    profileImageUrl: {
      type: String,
    
    },
  },
  { timestamps: true }
);

// ✅ Pre-save hook to hash password automatically
UserSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash password
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Create and export model
const User = mongoose.model("User", UserSchema);
export default User;
