const path = require("path");
const { uploadFile } = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const { fileTypeFromBuffer } = require("file-type");
const axios = require("axios");

exports.generateCertificate = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/certificate/generate",
      data,
      { timeout: 20000 }
    );

    if (!response.data || !response.data.image) {
      throw new Error("FastAPI did not return image");
    }

    const base64Image = response.data.image.replace(
      /^data:image\/png;base64,/,
      ""
    );

    const imageBuffer = Buffer.from(base64Image, "base64");

    // Detect file type
    const type = await fileTypeFromBuffer(imageBuffer);

    const uploadUrl = await uploadFile(
      BUCKET_NAME.CERTIFICATE,
      imageBuffer,
      `${FOLDERS.GENERATED}/${data.metadata.event_id}/${data.userData.user_id}.${type.ext}`,
      type.mime
    );

    return {
      success: true,
      url: uploadUrl,
    };
  } catch (error) {
    console.error("Certificate generation failed:", error);
    throw new Error("Failed to generate certificate using FastAPI");
  }
};
