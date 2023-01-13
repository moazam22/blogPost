import React from 'react';
import { MenuItem as MI } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Flex, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  notifications: string[];
  handleClick: () => void;
}

const MenuItem: React.FC<Props> = ({handleClick, title, notifications}) => {
  return (
    <MI
      icon={
        title === 'Logout' ?
        <FontAwesomeIcon icon={faRightFromBracket} />
        : title === 'New Post'
        ? <FontAwesomeIcon icon={faPlus} />
        : undefined
      }
      _hover={{bg: '#c2a400', color: 'whiteSmoke'}}
      onClick={handleClick}
    >
      <Flex alignItems='center'>
        <Text mr='10px'>{title}</Text>
        {
          (title === 'Chat' && !!notifications?.length ) 
            && <FontAwesomeIcon icon={faCircle} style={{ color: '#cd4040'}}/>
        }
      </Flex>
    </MI>
  )
}

export default MenuItem