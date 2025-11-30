const path = require("path");
const { spawn } = require("child_process");
const { uploadFile } = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const fileTypeFromBuffer = require("file-type");

exports.generateCertificate = async (data) => {
  return new Promise((resolve, reject) => {
    const pyFile = path.join(
      __dirname,
      "../python/certificate_generator/main.py"
    );

    const python = spawn("python", [pyFile]);

    let result = "";

    python.stdout.on("data", (chunk) => {
      result += chunk.toString();
    });

    python.on("close", async (code) => {
      console.log("Python exit:", code);

      try {
        // parse python output once
        const parsed = JSON.parse(result);
        const image = parsed.image;

        // Convert to clean buffer
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, "base64");
        const type = await fileTypeFromBuffer(imageBuffer);

        // Upload file
        const exists = await uploadFile(
          BUCKET_NAME.CERTIFICATE,
          imageBuffer,
          `${FOLDERS.GENERATED}/${data.metadata.event_id}/${data.userData.user_id}`,
          type
        );

        // 👇 Return the upload result to controller
        resolve({
          success: true,
          url: exists,
        });
      } catch (err) {
        console.error("Error:", err);
        reject("Python returned invalid JSON or upload failed");
      }
    });

    // Send input JSON
    python.stdin.write(JSON.stringify(data));
    python.stdin.end();
  });
};
