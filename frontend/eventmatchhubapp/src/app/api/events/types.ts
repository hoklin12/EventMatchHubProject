export interface CertificateWithRelations extends Certificate {
  Users?: {
    user_id: string;
    full_name: string;
    email: string;
  };

  CertificateDatas?: {
    certificatedata_id: string;
    title?: string;
    description?: string;
  };

  Portfolios?: {
    portfolio_id: string;
    title: string;
  }[];
}

export interface Certificate {
  certificate_id: string;
  user_id: string;
  certificatedata_id: string;
  verification_code?: string;
  verification_hash?: string;
  file_link?: string;
}

export type EventType =
  | "conference"
  | "workshop"
  | "webinar"
  | "meetup"
  | "competition"
  | "other";

export type EventStatus =
  | "draft"
  | "public"
  | "private"
  | "schedule"
  | "completed";

export interface Event {
  event_id: string;

  user_id: string;

  category_id: string;

  theme?: string;

  title: string;

  description?: string;

  type?: EventType;

  status: EventStatus;

  start_date: string; // ISO date string

  end_date: string; // ISO date string

  location_name: string;

  location: string;

  agenda?: string;

  schedule_date?: string;

  allowRemindEmail: boolean;

  attendance_token?: string;

  attendance_token_start?: string;

  attendance_token_expiry?: string;
}
