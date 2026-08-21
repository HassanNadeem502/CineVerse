import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true, //unique ka kam
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 300,
    },

    role: {
      type: String,
      enum: ["user", "admin"], //enum ka kam ka is ma jo jo word ha is ka ilawa is am koi cheez save nahi kar sakta
      default: "user", //is line ka matla agar koi role select nahi akrta to automaticaly user role select ho jaye gahceicec
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String,
      default: "",
    },
    //nicha tino email ka liya bnai ha
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationOTP: {
      type: String,
      default: null,
    },

    verificationOTPExpires: {
      type: Date,
      default: null,
    },

  //ya forget password ka liya ha 
  resetPasswordOTP: {
  type: String,
  default: null,
},

resetPasswordOTPExpires: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
