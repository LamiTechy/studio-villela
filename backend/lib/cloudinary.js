import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const envPath = path.resolve(process.cwd(), "backend", ".env");
dotenv.config({ path: envPath });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are required");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;
