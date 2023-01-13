import { io, Socket } from "socket.io-client";
import { Dispatch } from "react";
import { Action } from "../Context/AppReducer";
import { ActionTypes } from "../Context/AppReducer";
import { Message } from "../Context/utils/interfaces";

const socketUrl = process.env.REACT_APP_SOCKET_URL;

export const makeSocketConnection = (token: string) => {
  try{
    const socket = io(socketUrl!,{
      extraHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return socket;
  }catch(err){
    console.error('Connection Failed: ', err);
  }
}

export const gteOnlineUsers = (socket: Socket, dispatch: Dispatch<Action>) => {
  try {
    socket?.on('onlineUsers', (onlineUsers) => {
      dispatch({type: ActionTypes.SET_ONLINE_USERS, onlineUsers: [...onlineUsers.users]});
    })
  } catch (error) {
    console.error('Something went wrong at getting online-users, ERROR: ', error);
    return null;
  }
}

export const updateMessageList = (newMessage: Message, dispatch: Dispatch<Action>, messages: Message[] | []) => {
  console.log('in-update ')
  const updatedMessages = [...messages, newMessage];
  console.log('update-messages = ', updatedMessages);
  dispatch({type: ActionTypes.SET_MESSAGES, messages: [...updatedMessages]});
}

