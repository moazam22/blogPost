import { useState, useEffect, useCallback, useContext } from "react";
import { Flex } from "@chakra-ui/react";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import { GlobalContext } from "../../Context/GlobalProvider";
import { OnlineUsersType } from "../../Context/utils/interfaces";
import { ActionTypes } from "../../Context/AppReducer";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<OnlineUsersType | null>(null);
  const [filteredOnlineUsers, setFilteredOnlineUsers] = useState<OnlineUsersType[] | []>([]);
  const {user, onlineUsers, notifications, dispatch} = useContext(GlobalContext);

  useEffect(() => {
    if(!!onlineUsers?.length){
      const filterCurrentUser = onlineUsers.filter((onlineUser => onlineUser.userId !== user?.id));
      setFilteredOnlineUsers(filterCurrentUser);
    }
  }, [onlineUsers, user]);

  const clearSelectedUserNotification = useCallback((_user: OnlineUsersType | null) => {
    if(!!_user){
      const isNotificationExists = notifications.includes(_user.userId);
      if(!!isNotificationExists){
        const removedCurrentUserNotification = notifications.filter(_notification => _notification !== _user.userId);
        dispatch({type: ActionTypes.SET_NOTIFICATIONS, notifications: removedCurrentUserNotification});
      }
    }
  },[notifications, dispatch]);

  const updateSelectedUser = useCallback((_user:OnlineUsersType) => {
    setSelectedUser(_user);
    clearSelectedUserNotification(_user);
  },[clearSelectedUserNotification]);

  return (
    <Flex pt='2em' pb='1em' h='90vh' ml='5%' mr='5%'>
      <UserList 
        selectedUser={selectedUser} 
        onlineUsers = {filteredOnlineUsers} 
        notifications={notifications} 
        updateSelectedUser={updateSelectedUser} 
        user={user}
      />
      <ChatBox selectedUser={selectedUser} clearSelectedUserNotification={clearSelectedUserNotification} onlineUsers = {filteredOnlineUsers}/>
    </Flex>
  )
}

export default Chat