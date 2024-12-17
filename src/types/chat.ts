export interface ChatParticipant {
  id: string
  name: string
  role: "lawyer" | "client" | "family_member" | "beneficiary" | "external_lawyer" | "guarantor"
  email: string
}

export interface GroupChat {
  id: string
  name: string
  caseId?: string
  participants: ChatParticipant[]
  createdAt: Date
  lastMessage?: {
    content: string
    sender: string
    timestamp: Date
  }
}

export interface ChatMessage {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: Date
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
}