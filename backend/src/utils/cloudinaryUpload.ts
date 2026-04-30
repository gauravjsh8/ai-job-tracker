import { UploadApiResponse } from "cloudinary";

import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const streamUpload = (
  buffer: Buffer,
  folder: string,
  resource_type: "image" | "video" | "raw",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (result) resolve(result);
        else if (error) reject(error);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
