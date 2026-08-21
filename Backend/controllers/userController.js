import bcrypt from "bcryptjs";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


//--------------------Get Profile-------------------//

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user,
  });
};


//---------------Update Profile-----------------//
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find Logged-in User
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Fields
    if (name) user.name = name;
    if (email) user.email = email;

    // Save
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//----------------Change Password-----------------//
export const changePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;

        //validate input
        if(!currentPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please provide both current and new password"
            });
        }

        //Find Logged-in User
        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        //Check if current password is correct
        const isMatch = await user.matchPassword(currentPassword);  

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        //Update Password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    }


    //----------------Upload Profile Picture-----------------//
    export const uploadProfileImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "cineverse-profile-images",
          resource_type: "image",
          // Cloudinary defaults to 60 seconds. Slower connections can need
          // longer, and this value can be overridden in Backend/.env.
          timeout: Number(process.env.CLOUDINARY_TIMEOUT) || 120000,
        },
        (error, result) => {

          if (error) return reject(error);

          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);

    });

    // Update User
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.profileImage = result.secure_url;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully.",
      image: result.secure_url,
    });

  } catch (error) {
    const isCloudinaryNetworkError =
      error.name === "TimeoutError" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNRESET" ||
      error.code === "ETIMEDOUT" ||
      error.http_code === 499;

    console.error("Profile-image upload failed:", {
      message: error.message,
      code: error.code,
      httpCode: error.http_code,
    });

    return res.status(isCloudinaryNetworkError ? 503 : 500).json({
      success: false,
      message: isCloudinaryNetworkError
        ? "Image upload could not reach Cloudinary. Check your internet, DNS, firewall, or proxy settings and try again."
        : "Unable to upload profile image.",
    });

  }
};
