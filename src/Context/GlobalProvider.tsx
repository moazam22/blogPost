import React,{useMemo,createContext, useReducer,Reducer, ReactElement} from 'react';
import appReducer, { Action } from './AppReducer';
import {initialState} from './AppReducer';
import { InitState } from './utils/interfaces';
export const GlobalContext = createContext<InitState>({
  ...initialState,
});

interface Props{
  children: ReactElement
}

const GlobalProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer<Reducer<InitState, Action>>(appReducer, initialState);
  
  const store =  useMemo(() => (
    {
      user:state.user,
      postPage: state.postPage,
      myPostPage: state.myPostPage,
      socket: state.socket,
      onlineUsers: state.onlineUsers,
      messages: state.messages,
      notifications: state.notifications,
      dispatch 
    }),
  [state]);
  
  return (
    <GlobalContext.Provider value={{...store}}> 
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider