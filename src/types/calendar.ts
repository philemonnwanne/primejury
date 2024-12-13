export type CalendarEventType = 
  | "meeting"
  | "video-conference"
  | "court-date"
  | "deadline"
  | "holiday"
  | "blocked"
  | "statute-limitation";

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
}