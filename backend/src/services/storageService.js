const supabase = require("../config/supabaseClient");
const path = require("path");
const supabaseConfig = require("../config/supabaseConfig");

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

// // Create folder in Supabase Storage
// exports.createFolder = async function (bucket, folderPath) {
//   if (!folderPath.endsWith("/")) folderPath += "/";
//   const { data, error } = await supabase.storage
//     .from(bucket)
//     .upload(folderPath + "placeholder.txt", "", {
//       contentType: "text/plain",
//     });
//   if (error) {
//     console.error("Error creating folder:", error);
//     throw error;
//   }
//   return data;
// };

// Upload generated certificate file to Supabase Storage
exports.generatedUploadFile = async (buffer, filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from(supabaseConfig.BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      throw new Error(`Supabase Upload Error: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(supabaseConfig.BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw error;
  }
};
