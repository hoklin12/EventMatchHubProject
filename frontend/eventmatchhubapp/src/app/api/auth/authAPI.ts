import {
  apiClientJsonData,
  apiClientFormData,
} from "../../../services/apiClient";
import {
  ProfileResponse,
  LoginPayload,
  ParticipantRegisterPayload,
  OrganizerRegisterPayload,
  User,
  LoginResponse,
} from "./types";

export const login = (data: LoginPayload) =>
  apiClientJsonData.post<LoginResponse>("/auth/login", data);
export const registerParticipant = (data: ParticipantRegisterPayload) =>
  apiClientJsonData.post<User>("/auth/participantRegister", data);
export const registerOrganizer = (data: OrganizerRegisterPayload) =>
  apiClientJsonData.post<User>("/auth/organizerRegister", data);
export const getProfile = () =>
  apiClientJsonData.get<ProfileResponse>("/users/me");
export const updateProfile = (data: Partial<User>) =>
  apiClientJsonData.put<User>("/auth/profile", data);
export const logout = () => apiClientJsonData.post("/auth/logout");
