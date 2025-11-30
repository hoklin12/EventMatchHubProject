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
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
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
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
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
  const photoFiles = req.files?.photo || [];

  try {
    // Permission checks
    const isRoleOrganizer = await checkUserRoleOrganizer(userId);
    if (isRoleOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role doesn't have permission to access this API",
      });
    }

    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied. You're not organizer of this event.",
      });
    }

    // Load DB speakers
    const dbSpeakers = await models.Speaker.findAll({
      where: { event_id: eventId },
    });

    // Prepare helper function
    const findFile = (name) =>
      photoFiles.find(
        (f) => f.originalname.toLowerCase() === name.toLowerCase()
      );

    const results = [];

    // Step 1: Update or Add speakers
    for (let i = 0; i < speakersData.length; i++) {
      const sp = speakersData[i];

      //-------------------------------------------------------
      // A. ADD NEW SPEAKER
      //-------------------------------------------------------
      if (!sp.speaker_id || sp.speaker_id === null) {
        const newSpeaker = await models.Speaker.create({
          event_id: eventId,
          order: i + 1,
          speaker_name: sp.speaker_name,
          title: sp.title,
          description: sp.description,
        });

        // upload image if exists
        if (sp.fileName) {
          const fileObj = findFile(sp.fileName);
          if (!fileObj)
            throw new Error(`Missing file for new speaker: ${sp.fileName}`);

          const hash = hashString(fileObj.buffer);
          const mimeType =
            mime.lookup(fileObj.originalname) || "application/octet-stream";

          const url = await uploadFile(
            BUCKET_NAME.EVENT,
            fileObj.buffer,
            `${FOLDERS.SPEAKER}/${eventId}/${newSpeaker.speaker_id}`,
            mimeType
          );

          newSpeaker.photo_hash = hash;
          newSpeaker.photo_url = url;
          await newSpeaker.save();
        }

        results.push(newSpeaker);
        continue;
      }

      //-------------------------------------------------------
      // B. UPDATE EXISTING SPEAKER
      //-------------------------------------------------------
      const existingSpeaker = dbSpeakers.find(
        (d) => d.speaker_id === sp.speaker_id
      );

      if (!existingSpeaker) {
        throw new Error(`Speaker ID ${sp.speaker_id} not found.`);
      }

      existingSpeaker.speaker_name = sp.speaker_name;
      existingSpeaker.title = sp.title;
      existingSpeaker.description = sp.description;
      existingSpeaker.order = i + 1;

      // Update photo
      if (sp.fileName) {
        const fileObj = findFile(sp.fileName);
        if (!fileObj)
          throw new Error(`Missing file for speaker: ${sp.fileName}`);

        const newHash = hashString(fileObj.buffer);
        if (existingSpeaker.photo_hash !== newHash) {
          const mimeType =
            mime.lookup(fileObj.originalname) || "application/octet-stream";

          const url = await uploadFile(
            BUCKET_NAME.EVENT,
            fileObj.buffer,
            `${FOLDERS.SPEAKER}/${eventId}/${existingSpeaker.speaker_id}`,
            mimeType
          );

          existingSpeaker.photo_hash = newHash;
          existingSpeaker.photo_url = url;
        }
      }

      // Remove photo
      if (sp.removePhoto === true) {
        await deleteFile(
          BUCKET_NAME.EVENT,
          `${FOLDERS.SPEAKER}/${eventId}/${existingSpeaker.speaker_id}`
        );
        existingSpeaker.photo_hash = null;
        existingSpeaker.photo_url = null;
      }

      await existingSpeaker.save();
      results.push(existingSpeaker);
    }

    //-------------------------------------------------------
    // Step 2: DELETE speakers removed by the user
    //-------------------------------------------------------
    for (const dbSp of dbSpeakers) {
      const stillExists = speakersData.some(
        (s) => s.speaker_id === dbSp.speaker_id
      );

      if (!stillExists) {
        await deleteFile(
          BUCKET_NAME.EVENT,
          `${FOLDERS.SPEAKER}/${eventId}/${dbSp.speaker_id}`
        );
        await dbSp.destroy();
      }
    }

    //-------------------------------------------------------
    // Sort results by order
    //-------------------------------------------------------
    results.sort((a, b) => a.order - b.order);

    return res.status(200).json({
      status: "success",
      message: "Event speakers updated successfully.",
      data: results,
    });
  } catch (error) {
    console.error("Update Event Speaker Error:", error);
    next(error);
  }
};
