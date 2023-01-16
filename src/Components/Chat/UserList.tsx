import { memo } from "react";
import { 
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { border } from "../../utils";
import { OnlineUsersType, UserType } from "../../Context/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  selectedUser: OnlineUsersType | null;
  onlineUsers: OnlineUsersType[] | [];
  notifications: string[];
  user: UserType | null;
  updateSelectedUser: (_user: OnlineUsersType) => void;
}

const UserList: React.FC <Props> = ({ selectedUser, onlineUsers, notifications, user, updateSelectedUser }) => {
  return (
    <Flex w='300px' pl='10px' borderTopLeftRadius='10px' borderBottomLeftRadius='10px' direction='column' border={border}>
      <Flex direction='column' pr='10px'>
        <Flex flex='1' direction='column' maxHeight='70vh' overflowY='auto'>
        {
          !!onlineUsers?.length && onlineUsers.map((_user: OnlineUsersType, index: number) => {
            const {name: userName} = _user?.data;
            const {userId} = _user;
            return(
              <div key={index}>
                <Flex 
                  cursor='pointer' 
                  borderRadius='10px'
                  mr='10px'
                  _hover={{bg: '#beaf59', color: 'white'}}
                  onClick={()=>updateSelectedUser(_user)}  
                  bg={!!selectedUser && selectedUser === _user ? '#beaf59' : ''}
                  color={!!selectedUser && selectedUser === _user ? 'whiteSmoke' : 'black'}
                >
                  <UserAvatar userName={!!userName ? userName : ''} />
                  <Flex
                    justifyContent='space-between' flex={1} alignItems='center' mt='10px' mb='10px' pr='10px'
                  >
                    <Text ml='1em'>{userName}</Text>
                    {
                      (!!notifications?.length && !!userId && notifications.includes(userId) && userId !== selectedUser?.userId) &&
                      <FontAwesomeIcon icon={faCircle} size='1x' style={{color: '#cd4040'}}/>
                    }
                  </Flex>
                </Flex>
                <Divider />
              </div>
            )
          })
        }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(UserList);