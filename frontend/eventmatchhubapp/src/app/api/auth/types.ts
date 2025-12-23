export interface LoginPayload {
  email: string;
  password_hash: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}

export interface ParticipantRegisterPayload {
  full_name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  skills?: string[];
}

export interface ProfileResponse {
  status: string;
  user: User;
}

export interface OrganizerRegisterPayload {
  full_name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  skills?: string[];
  organization_name: string;
  position: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  password_hash?: string;
  profile?: string;
  roles: string;
  organization_name?: string;
  position: string;
  skills: string[];
  avatar_url?: string;
}
