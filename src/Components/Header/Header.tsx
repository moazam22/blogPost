import { HeaderContainer, Heading } from '../Styled/HeaderContainer.Styled';
import {ReactComponent as BlogSvg} from '../../Assets/Blog.svg';
import { 
  Flex, 
  Text,
  Menu,
  MenuButton,
  MenuList,
  // MenuItem,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import MenuItem from '../MenuItem/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalProvider';
import { ActionTypes } from '../../Context/AppReducer';
import { MenuItems } from '../../utils';

interface Props{
  headingText: string;
}

const Header:React.FC <Props> = ({headingText}) => {
  const { socket, notifications, dispatch } = useContext(GlobalContext);  
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 767px)');

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({type: ActionTypes.SET_USER, user: null});
    socket?.close();
    dispatch({type: ActionTypes.SET_SOCKET, socket: null})
    navigate('/');
  }
  
  return (
    <HeaderContainer>
      <Flex pl='1em' cursor='pointer' onClick={()=>navigate('/blogs')}>
        <BlogSvg height= '35px' width='35px' fill='#c2a400'/>
        <Heading>Blog Post</Heading>
      </Flex>
      {
        !isMobile && (
          <Flex>
            <Text fontSize='2xl' fontWeight='600' color='#c2a400'>
              {!!headingText ? headingText : ''}
            </Text>
          </Flex>
        )
      }
      <Flex  justifyContent='flexEnd' mt='1em' mb='1em' mr='1em'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FontAwesomeIcon icon={faBars} color='#c2a400'/>}
            variant='outline'
          />
          {!!notifications?.length && <FontAwesomeIcon icon={faCircle} style={{position: 'relative', right: '15', top:'30', color: '#cd4040'}}/>}
          <MenuList zIndex='3'>
            {
              !!MenuItems?.length && MenuItems.map((item, index) => {
                return(
                  <MenuItem
                    key={index}
                    handleClick={!!item?.url ? ()=> navigate(item.url) : handleLogout}
                    title={item?.title}
                    notifications={notifications}
                  />      
                )
              })
            }
          </MenuList>
        </Menu>
      </Flex>

    </HeaderContainer>
  )
}

export default Header;