import { useState, useCallback } from "react"
import { 
  Button,
  Flex,
  Text, 
  Collapse,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import EditProfileForm from "./EditProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {user} = useContext(GlobalContext);
  const [isMobile] = useMediaQuery('(max-width: 767px)')

  const closeEditForm = useCallback(()=>setIsEdit(false),[]);

  const mainContainerWidth = isMobile ? '90%' : '50%';
  const mainContainerMargin = isMobile ? '5%' : '25%';
  const wrapper = isMobile ? '95%' : '70%';

  return (
    <Flex w={mainContainerWidth} ml={mainContainerMargin} mt='10vh' justifyContent='center' >
      <Flex w={wrapper} direction='column' border='apx solid black'>
        <Flex justifyContent='space-between'>
          <Text fontWeight='600'>Name:</Text>
          <Text>{user?.fullName}</Text>
        </Flex>
        <Flex justifyContent='space-between'>
          <Text fontWeight='600'>Email:</Text>
          <Text>{user?.email}</Text>
        </Flex>
        <Button
          mt='2em'
          w='100%'
          color='#c2a400'
          variant='outline'
          _hover={{bg: '#c2a400', color: 'whiteSmoke'}}
          onClick={()=>setIsEdit(!isEdit)}
          leftIcon={
            <FontAwesomeIcon icon={!!isEdit ? faArrowUp : faArrowDown} />
          }
        >
          {!!isEdit ? `Hide Edit Form` : `Show Edit Form`}
        </Button>
        <Collapse in={isEdit} animateOpacity>
          <EditProfileForm closeEditForm={closeEditForm}/>
        </Collapse>
      </Flex>
    </Flex>
  )
}

export default Profile