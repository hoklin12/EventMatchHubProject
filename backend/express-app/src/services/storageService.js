const supabase = require("../config/supabaseClient");

// Check if folder exists in Supabase Storage
exports.folderExists = async function (bucket, folderPath) {
  if (!folderPath.endsWith("/")) folderPath += "/";

  const { data, error } = await supabase.storage.from(bucket).list(folderPath, {
    limit: 1,
    offset: 0,
  });

  if (error) {
    console.error("Error checking folder:", error);
    return false;
  }
  return data.length > 0;
};

// Upload generated certificate file to Supabase Storage
// exports.generatedUploadFile = async (buffer, filePath) => {
//   try {
//     const { data, error } = await supabase.storage
//       .from(supabaseConfig.BUCKET_NAME)
//       .upload(filePath, buffer, {
//         contentType: "image/png",
//         upsert: true,
//       });

//     if (error) {
//       throw new Error(`Supabase Upload Error: ${error.message}`);
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from(supabaseConfig.BUCKET_NAME)
//       .getPublicUrl(filePath);

//     return publicUrlData.publicUrl;
//   } catch (error) {
//     throw error;
//   }
// };

exports.uploadFile = async (bucket, buffer, filePath, mimeType) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: mimeType || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      throw new Error(`Supabase Upload Error: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw error;
  }
};

exports.deleteFile = async (bucket, filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw new Error(`Supabase Delete Error: ${error.message}`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

exports.replaceFile = async (bucket, buffer, filePath, mimeType) => {
  try {
    // First, delete the existing file
    await this.deleteFile(bucket, filePath);
    // Then, upload the new file
    const fileURL = await this.uploadFile(bucket, buffer, filePath, mimeType);
    return fileURL;
  } catch (error) {
    throw error;
  }
};

exports.getFileURL = (bucket, filePath) => {
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
};
