const models = require("../models");
const mime = require("mime-types");
const {
  uploadFile,
  deleteFile,
  replaceFile,
} = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");
const { checkUserRoleOrganizer } = require("../utils/checkUserRole");
const { hashString } = require("../utils/encryptUtils");

/* //////////////////////////////////////////////////////////////////////////////////
                           Event Speaker Management
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Create, Read, Update Event Speaker ==================
// Add a speaker to an event only for organizers that created the event
exports.addEventSpeaker = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const speakersData = JSON.parse(req.body.data);

  // 2. Get files (ensure it's an array)
  const photoFiles = req.files["photo"] ? req.files["photo"] : [];
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in this event.`,
      });
    }

    //Check event haven't speaker data
    const existingSpeakers = await models.Speaker.findAll({
      where: { event_id: eventId },
    });
    if (existingSpeakers.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Can't add more speakers to this event.",
      });
    }

    // 4. Process each speaker
    const createdSpeakers = await Promise.all(
      speakersData.map(async (speaker, index) => {
        const newSpeaker = await models.Speaker.create({
          event_id: eventId,
          order: index + 1,
          speaker_name: speaker.speaker_name,
          title: speaker.title,
          description: speaker.description,
        });

        let fileObj = null;
        if (speaker.fileName) {
          fileObj = photoFiles.find(
            (f) =>
              f.originalname.toLowerCase() === speaker.fileName.toLowerCase()
          );
        }
        if (speaker.fileName && !fileObj) {
          console.warn(`No uploaded file matched ${speaker.fileName}`);
        }
        if (fileObj) {
          const mimeType =
            mime.lookup(fileObj.originalname) || "application/octet-stream";

          const fileURL = await uploadFile(
            BUCKET_NAME.EVENT,
            fileObj.buffer,
            `${FOLDERS.SPEAKER}/${eventId}/${newSpeaker.speaker_id}`,
            mimeType
          );

          // Create hash of photo data
          const photoHash = hashString(fileObj.buffer);

          newSpeaker.photo_hash = photoHash;
          newSpeaker.photo_url = fileURL;
          await newSpeaker.save();
        }

        return newSpeaker;
      })
    );

    return res.status(201).json({
      status: "success",
      message: "Event speakers added successfully.",
      data: createdSpeakers,
    });
  } catch (error) {
    console.error("Add Event Speaker Error:", error);
    next(error);
  }
};

// View event speakers, accessible to all authenticated users
exports.viewEventSpeakers = async (req, res, next) => {
  const eventId = req.params.event_id;
  const userId = req.user.userId;
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in this event.`,
      });
    }

    //check if event exists
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: `Event with not found.`,
      });
    }

    const speakers = await models.Speaker.findAll({
      where: { event_id: eventId },
      attributes: [
        "speaker_id",
        "order",
        "speaker_name",
        "title",
        "description",
        "photo_url",
      ],
    });
    return res.status(200).json({
      status: "success",
      data: speakers.sort((a, b) => a.order - b.order),
    });
  } catch (error) {
    console.error("View Event Speakers Error:", error);
    next(error);
  }
};

// Update event speakers only for organizers that created the event
exports.updateEventSpeaker = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const speakersData = JSON.parse(req.body.data);
  const photoFiles = req.files ? req.files.photo : [];

  try {
    // --- Permission checks ---
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in this event.`,
      });
    }

    // --- Process Update ---
    const updatedSpeakers = await Promise.all(
      speakersData.map(async (speaker) => {
        const existingSpeaker = await models.Speaker.findOne({
          where: { speaker_id: speaker.speaker_id, event_id: eventId },
        });

        if (!existingSpeaker) {
          throw new Error(
            `Speaker ID ${speaker.speaker_id} not found in this event.`
          );
        }

        // update text fields
        existingSpeaker.speaker_name = speaker.speaker_name;
        existingSpeaker.title = speaker.title;
        existingSpeaker.description = speaker.description;

        let fileObj = null;

        // --- Check if updating photo ---
        if (speaker.fileName) {
          fileObj = photoFiles.find(
            (f) =>
              f.originalname.toLowerCase() === speaker.fileName.toLowerCase()
          );

          if (!fileObj) {
            throw new Error(
              `Photo file for speaker ${speaker.speaker_name} is missing.`
            );
          }

          const newHash = hashString(fileObj.buffer);

          // ⛔ Skip upload if hash matches (same photo)
          if (existingSpeaker.photo_hash === newHash) {
            return existingSpeaker;
          }

          // Replace existing photo
          if (existingSpeaker.photo_url) {
            const mimeType =
              mime.lookup(fileObj.originalname) || "application/octet-stream";
            const fileURL = await replaceFile(
              BUCKET_NAME.EVENT,
              fileObj.buffer,
              `${FOLDERS.SPEAKER}/${eventId}/${existingSpeaker.speaker_id}`,
              mimeType
            );
          }

          // Upload new photo if none exists
          if (existingSpeaker.photo_url == null) {
            const mimeType =
              mime.lookup(fileObj.originalname) || "application/octet-stream";

            // upload new photo
            const fileURL = await uploadFile(
              BUCKET_NAME.EVENT,
              fileObj.buffer,
              `${FOLDERS.SPEAKER}/${eventId}/${existingSpeaker.speaker_id}`,
              mimeType
            );

            existingSpeaker.photo_hash = newHash;
            existingSpeaker.photo_url = fileURL;
          }
        }

        // Remove photo if UI tells to remove
        if (speaker.removePhoto === true) {
          await deleteFile(
            BUCKET_NAME.EVENT,
            `${FOLDERS.SPEAKER}/${eventId}/${existingSpeaker.speaker_id}`
          );
          existingSpeaker.photo_hash = null;
          existingSpeaker.photo_url = null;
        }

        await existingSpeaker.save();
        return existingSpeaker;
      })
    );

    // sort by "order"
    updatedSpeakers.sort((a, b) => a.order - b.order);

    return res.status(200).json({
      status: "success",
      message: "Event speaker updated successfully.",
      data: updatedSpeakers,
    });
  } catch (error) {
    console.error("Update Event Speaker Error:", error);
    next(error);
  }
};
