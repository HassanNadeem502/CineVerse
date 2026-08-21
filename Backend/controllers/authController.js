import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10); //Salt ek random value generate karti hai jo password ko aur secure banati hai.

    const hashedPassword = await bcrypt.hash(password, salt);
    //Craet OTP
    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    //OTP expires in 10 minutes
    const verificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000); //10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      verificationOTP,
      verificationOTPExpires,
    });

    //--------------Ab yaha email send karna ha------------------//

    // Send OTP Email
    await sendEmail(
      email,
      "Verify Your Email",
      `
    <h2>Welcome ${name}</h2>

    <p>Your verification OTP is:</p>

    <h1 style="letter-spacing:5px;color:#2563eb;">
      ${verificationOTP}
    </h1>

    <p>This OTP will expire in 10 minutes.</p>

    <br/>

    <small>Please do not share this OTP with anyone.</small>
  `,
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "Registration Successful. OTP sent to your email.",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------------Login Function--------------------//

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    // Response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//----------verify Email or OTP----------//
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check Fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.verificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check Expiry
    if (user.verificationOTPExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Verify User
    user.isVerified = true;

    // Clear OTP
    user.verificationOTP = null;
    user.verificationOTPExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//------------------Resend OTP and Verify--------------

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check Email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already Verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate New OTP
    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expiry (10 Minutes)
    const verificationOTPExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save
    user.verificationOTP = verificationOTP;
    user.verificationOTPExpires = verificationOTPExpires;

    await user.save();

    // Send Email
    await sendEmail(
      email,
      "New Verification OTP",
      `
        <h2>Hello ${user.name}</h2>

        <p>Your new verification OTP is:</p>

        <h1 style="color:#2563eb;">
          ${verificationOTP}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//---------------Forgot Password------------------//
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check Email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Generate OTP
    const resetPasswordOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expiry
    const resetPasswordOTPExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save
    user.resetPasswordOTP = resetPasswordOTP;
    user.resetPasswordOTPExpires = resetPasswordOTPExpires;

    await user.save();

    // Send Email
    await sendEmail(
      email,
      "Reset Password OTP",
      `
        <h2>Hello ${user.name}</h2>

        <p>Your password reset OTP is:</p>

        <h1 style="letter-spacing:5px;color:#dc2626;">
          ${resetPasswordOTP}
        </h1>

        <p>This OTP will expire in 10 minutes.</p>

        <small>If you didn't request this, ignore this email.</small>
      `
    );

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//reset password function
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check Fields
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check Expiry
    if (user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash New Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update Password
    user.password = hashedPassword;

    // Clear OTP
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};