export interface SelectedUserType {
  id: string;
  fullName: string;
}

export interface NewMessageType {
  message: string;
  senderId: string | null;
}