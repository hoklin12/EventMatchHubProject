const BUCKET_NAME = {
  CERTIFICATE: "certificate",
  EVENT: "event",
  REGISTER: "register",
  USER: "user",
};

const FOLDERS = {
  //Certificate
  TEMPLATES_APPRECIATION: "template/appreciation",
  TEMPLATES_COMPLETION: "template/completion",
  GENERATED: "generated",
  SIGNATURE: "signature",

  //Event
  THEME: "theme",
  AGENDA: "agenda",
  SPEAKER: "speaker",
  ATTENDANCE: "attendance",

  //Register
  SUMMARYFORMREGISTER: "summaryFormRegister",
  FORMREGISTER: "formRegister",

  //User
  PROFILE: "profile",
};

module.exports = Object.freeze({
  BUCKET_NAME,
  FOLDERS,
});
