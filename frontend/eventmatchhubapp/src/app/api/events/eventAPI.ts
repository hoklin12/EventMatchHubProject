import {
  apiClientJsonData,
  apiClientFormData,
} from "../../../services/apiClient";
import { Event } from "./types";

export const getAllParticipantCertificate = () =>
  apiClientJsonData.get("/events/certificates/participant/All");
// export const updateProfile = (data: Partial<User>) => apiClientJsonData.put<User>('/auth/profile', data);
export const registerEventParticipant = (
  eventId: string,
  portfolioId: string,
  submission: Array<any>
) =>
  apiClientJsonData.post(`/events/${eventId}/register`, {
    portfolioId: portfolioId,
    submission: submission,
  });
