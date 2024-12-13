export type CalendarEventType = 
  | "meeting"
  | "video-conference"
  | "court-date"
  | "deadline"
  | "holiday"
  | "blocked"
  | "statute-limitation"
  | "hearing";

export type CalendarView = "month" | "week" | "day";

export type CalendarSource = {
  id: string;
  name: string;
  type: "primary" | "google" | "outlook" | "apple";
  color: string;
  enabled: boolean;
};

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: CalendarEventType;
  description?: string;
  caseId?: string;
  caseName?: string;
  isSharedWithClient?: boolean;
  clientId?: string;
  location?: string;
  meetingLink?: string;
  color?: string;
  recurring?: boolean;
  recurrencePattern?: string;
  calendarId?: string;
}

export interface SharedCalendarLink {
  id: string;
  url: string;
  expiresAt?: Date;
  createdAt: Date;
  accessType: "view" | "schedule";
}