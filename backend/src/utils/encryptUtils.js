const crypto = require("crypto");

function hashJsonObject(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);

  const hash = crypto.createHash("sha256");

  hash.update(jsonString);

  return hash.digest("hex");
}
module.exports = {
  hashJsonObject,
};
