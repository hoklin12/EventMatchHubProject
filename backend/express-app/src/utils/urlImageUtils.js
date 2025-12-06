const axios = require("axios");

async function getSignatureBase64(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data).toString("base64");

    const ext = url.split(".").pop().toLowerCase();
    const mimeType =
      ext === "png"
        ? "image/png"
        : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : "image/*";

    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    console.error("Error fetching signature:", err);
    return null;
  }
}

module.exports = {
  getSignatureBase64,
};
