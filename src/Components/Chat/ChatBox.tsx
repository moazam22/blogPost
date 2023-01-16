import { useEffect, createRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import MessageInput from "../MessageInput/MessageInput";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import { border } from "../../utils";
import {OnlineUsersType} from '../../Context/utils/interfaces';
import { updateMessageList } from "../../utils/ReuseableFuctions";
import ChatHelperText from "./ChatHelperText";

interface Props {
  selectedUser: OnlineUsersType | null;
  onlineUsers: OnlineUsersType[] | [];
  clearSelectedUserNotification: (_user: OnlineUsersType | null) => void;
}

const selectUserMessage = `Select a user to chat`;
const allUsersOffline = `All other users are offline.`

const ChatBox: React.FC <Props> = ({selectedUser, onlineUsers, clearSelectedUserNotification}) => {
  const {user, socket, messages, dispatch} = useContext(GlobalContext);
  const messagesRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if(!!messages?.length){
      if (!!messagesRef?.current?.scrollIntoView)
        messagesRef.current.scrollIntoView({ behavior: "smooth" });
      clearSelectedUserNotification(selectedUser);
    }
  },[messages, clearSelectedUserNotification, selectedUser, messagesRef]);

  const sendMessage = (msgBody: string) => {
    if(!!msgBody){
      const message = {
        to: selectedUser?.userId,
        content: msgBody,
      }
      const newMessage = {
        message: msgBody,
        senderId: !!user?.id ? user.id : null,
        receiverId: !!selectedUser?.userId ? selectedUser.userId : null,
      }
      updateMessageList(newMessage, dispatch, messages);
      socket?.emit('private', message);
    }
  }

  const userName = !!selectedUser?.data?.name ? selectedUser.data.name : null;

  return (
    <Flex
      direction='column'
      flex={1}
      borderTopRightRadius='10px'
      borderBottomRightRadius='10px'
      borderTop={border}
      borderRight={border}
      borderBottom={border}
    >
      {
        !!selectedUser && !!onlineUsers?.length ? (
        <>
          <Flex
            h='10%'
            w='100%'
            pl='10px'
            alignItems='center'
            borderBottom={border}
          >
            <UserAvatar userName={!!userName ? userName : 'Unknown'} hideOnlineStatus={true}/>
            <Text ml='1em' fontWeight='500'>{!!userName ? userName : 'Unknown'}</Text>
          </Flex>
          <Flex
            maxH='83%'
            minH='83%'
            overflowY='auto'
            w='100%'
            flexWrap='wrap'
          >
            {
             !!messages?.length && messages.map((message, index) => 
                ((message.receiverId === selectedUser?.userId) || (message.senderId === selectedUser?.userId))
                && (
                  <Flex
                    w='100%'
                    direction='column'
                    m='10px'
                    key={index}
                  >
                    <Flex 
                      bg='#c2a400' 
                      borderRadius='15px' 
                      w='fit-content' 
                      direction='column' 
                      p='15px' 
                      // alignSelf={currentChatMessages?.senderId === user?.id ? 'flex-end' : 'flex-start'}  
                      alignSelf={message.senderId === user?.id ? 'flex-end' : 'flex-start'}
                      color='whitesmoke'
                    >
                      <Text>{message.message}</Text>
                      {/* <Text alignSelf='flex-end' fontSize='10px'>{moment(message.createdAt).format('DD-MM-YYYY hh:mm A')}</Text> */}
                    </Flex>
                  </Flex>  
                ) 
              )
            }
            <div ref={messagesRef}/>
          </Flex>
          <Flex
            w='100%'
            h='7%'
          >
            <MessageInput sendMessage={sendMessage}/>
          </Flex>
        </>
        ) : (
          <ChatHelperText message={!onlineUsers?.length ? allUsersOffline : selectUserMessage}/>
        )
      }
    </Flex>
  )
}

export default ChatBox