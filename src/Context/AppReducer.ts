import { Socket } from "socket.io-client";
import { InitState, Message, OnlineUsersType, UserType } from "./utils/interfaces"

const LS_USER = localStorage.getItem('user');

export const initialState: InitState = {
  user: !!LS_USER ? JSON.parse(LS_USER) : null,
  postPage: 2,
  myPostPage: 2,
  socket: null,
  onlineUsers: [],
  messages: [],
  notifications: [],
  dispatch: () => {
		return
	},
}

export enum ActionTypes {
	SET_USER = 'setUser',
  SET_PAGE = 'setPage',
  SET_MY_POST_PAGE = 'setMyPostPage',
  SET_SOCKET = 'setSocket',
  SET_ONLINE_USERS = 'setOnlineUsers',
  SET_MESSAGES = 'setMessages',
  SET_NOTIFICATIONS = 'setNotification',
}

export type Action =
	{ type: ActionTypes.SET_USER, user: UserType | null }
  | { type: ActionTypes.SET_PAGE, postPage: number  }
  | { type: ActionTypes.SET_MY_POST_PAGE, myPostPage: number  }
  | {type: ActionTypes.SET_SOCKET, socket: Socket | null}
  | {type: ActionTypes.SET_ONLINE_USERS, onlineUsers: OnlineUsersType[] | []}
  | {type: ActionTypes.SET_MESSAGES, messages: Message[] | []}
  | {type: ActionTypes.SET_NOTIFICATIONS, notifications: string[] | []}

export default function appReducer(state: InitState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case ActionTypes.SET_PAGE:
      return {
        ...state,
        postPage: action.postPage,
      }
    case ActionTypes.SET_MY_POST_PAGE:
      return {
        ...state,
        myPostPage: action.myPostPage,
      }
    case ActionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      }
    case ActionTypes.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      }
    case ActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      }
    case ActionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      }
    default:
      return state;
  }
}