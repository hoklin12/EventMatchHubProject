// services/eventAttendanceService.js
const models = require("../models");
const { Op } = require("sequelize");
const crypto = require("crypto");
class EventAttendanceService {
  /**
   * Mark absents for sessions whose QR expired
   */
  static async markAbsentForExpiredSessions() {
    const expiredSessions = await models.EventSession.findAll({
      where: {
        qr_expires_at: { [Op.lte]: new Date() },
      },
    });

    for (const session of expiredSessions) {
      // Get all registrations
      const registrations = await models.Registration.findAll({
        where: { event_id: session.event_id },
      });
      console.log(`registrations:`, registrations.length);
      for (const reg of registrations) {
        await models.EventAttendance.update(
          {
            attendance_status: "absent",
            check_in_time: new Date(),
          },
          {
            where: {
              event_session_id: session.event_session_id,
              registration_id: reg.registration_id,
            },
          }
        );
        console.log(
          `Marked absent for registration ${reg.registration_id} in session ${session.event_session_id}`
        );
      }
    }

    return expiredSessions.length;
  }

  /**
   * Check-in via QR
   */
  static async checkInByQR(qrToken, userId) {
    // 1. Validate QR token
    const session = await models.EventSession.findOne({
      where: { qr_token: qrToken },
    });

    if (!session) throw new Error("Invalid QR Code");

    if (session.qr_expires_at < new Date()) throw new Error("QR Code expired");

    // 2. Find registration AND ensure approved
    const registration = await models.Registration.findOne({
      where: {
        user_id: userId,
        event_id: session.event_id,
        status: "approved",
      },
    });

    if (!registration) throw new Error("User not approved for this event");

    // 3. Find attendance record
    const attendance = await models.EventAttendance.findOne({
      where: {
        event_session_id: session.event_session_id,
        registration_id: registration.registration_id,
      },
    });

    if (!attendance) {
      throw new Error("Attendance record does not exist for this session");
    }

    // 4. Prevent double check-in
    if (attendance.attendance_status === "present") {
      return { alreadyCheckedIn: true, attendance };
    }

    // 5. Update attendance
    attendance.attendance_status = "present";
    attendance.check_in_time = new Date();
    await attendance.save();

    return { success: true, attendance };
  }
}

async function generateDailySessionsForRange(eventId, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = [];
  let current = new Date(start);

  while (current <= end) {
    days.push(new Date(current)); // Push a new Date object
    current.setDate(current.getDate() + 1);
  }

  // Get existing sessions
  const existingSessions = await models.EventSession.findAll({
    where: { event_id: eventId },
  });

  const existingDates = existingSessions.map((s) => {
    const d = new Date(s.session_date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  const sessions = [];

  for (const day of days) {
    const normalizedDay = new Date(day);
    normalizedDay.setHours(0, 0, 0, 0);

    if (!existingDates.includes(normalizedDay.getTime())) {
      const newSession = await models.EventSession.create({
        event_id: eventId,
        session_date: day, // keep original Date
        qr_token: crypto.randomUUID(),
        qr_expires_at: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
      });

      sessions.push(newSession);

      // Create attendance rows for approved registrations
      const registrations = await models.Registration.findAll({
        where: { event_id: eventId, status: "approved" },
      });

      for (const reg of registrations) {
        await models.EventAttendance.create({
          event_session_id: newSession.event_session_id,
          registration_id: reg.registration_id,
          attendance_status: "pending",
          check_in_time: null,
        });
      }
    }
  }

  return sessions;
}

module.exports = { EventAttendanceService, generateDailySessionsForRange };
