const BUCKET_NAME = {
  CERTIFICATE: "certificate",
  EVENT: "event",
  REGISTER: "register",
};

const FOLDERS = {
  //Certificate
  TEMPLATES_APPRECIATION: "template/appreciation",
  TEMPLATES_COMPLETION: "template/completion",
  GENERATED: "generated",

  //Event
  THEME: "theme",
  AGENDA: "agenda",
  SPEAKER: "speaker",
  ATTENDANCE: "attendance",

  //Register
  SUMMARYFORMREGISTER: "summaryFormRegister",
  FORMREGISTER: "formRegister",
};

module.exports = Object.freeze({
  BUCKET_NAME,
  FOLDERS,
});
