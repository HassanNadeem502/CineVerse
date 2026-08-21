import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Backend/.env explicitly so the config works even if nodemon or VS Code
// starts the app from a different working directory.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  if (!CLOUDINARY_URL) {
    throw new Error(
      "Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Backend/.env, or provide CLOUDINARY_URL.",
    );
  }

  const cloudinaryUrl = CLOUDINARY_URL.replace(/^cloudinary:\/\//, "https://");
  const parsedUrl = new URL(cloudinaryUrl);

  cloudinary.config({
    cloud_name: parsedUrl.hostname,
    api_key: parsedUrl.username,
    api_secret: parsedUrl.password,
  });
} else {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;
