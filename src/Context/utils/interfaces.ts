import { Dispatch } from "react";
import { Action } from "../AppReducer";
import { Socket } from 'socket.io-client';

export interface UserType {
  access_token?: string | undefined | null;
  id?: string | undefined;
  fullName?: string | null | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  __typename?: string | undefined;
}

export interface OnlineUsersType {
  data: {
    socketId: string;
    name: string;
  },
  userId: string;
}

export interface Message {
  message: string;
  senderId: string | null;
  receiverId: string | null;
}

export interface InitState {
  user: UserType|null;
  postPage: number; 
  myPostPage: number;
  socket: Socket | null;
  onlineUsers: OnlineUsersType[] | [],
  messages: Message[] | [],
  notifications: string[],
  dispatch: Dispatch<Action>;
}
