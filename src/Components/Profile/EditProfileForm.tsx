import { useContext, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { 
  useUpdateUserMutation,
  UpdateUserInput,
} from "../../generated/graphql";
import { 
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input, 
  Button,
  useToast,
} from "@chakra-ui/react";
import { GlobalContext } from "../../Context/GlobalProvider";
import { ActionTypes } from "../../Context/AppReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import {updateUser} from '../../utils/FormScemas';

interface Props {
  closeEditForm: ()=>void;
}

const EditProfileForm: React.FC<Props> = ({closeEditForm}) => {
  const {register, handleSubmit, setValue, getValues, formState: {errors}} 
    = useForm<UpdateUserInput>({
      resolver: yupResolver(updateUser),
    });
  const {user,dispatch} = useContext(GlobalContext);
  const toast = useToast();

  const [updateUserMutation, { loading, }] = useUpdateUserMutation({
    onCompleted: () => onUpdateSuccess(),
    onError: () => toast({
      title: `Couldn't update user.`,
      status: 'error',
      isClosable: true,
      position: 'top',
    })
  });

  useEffect(() => {
    if(!!user){
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email!);
    }
  },[]);

  const onSubmit = (data: UpdateUserInput) => {
    if(!!isChanged()){
      return toast({
        title: `Nothing Changed.`,
        status: 'info',
        isClosable: true,
        position: 'top',
      })
    }
    data['id'] = user?.id!;
    updateUserMutation({
      variables: {
        updateUserInput: data
      }
    })
  }

  const onUpdateSuccess = () => {
    const newUser = getValues();
    const _user = {
      ...user,
      email: newUser.email, 
      firstName: newUser?.firstName!,
      lastName: newUser?.lastName!,
      fullName: `${newUser.firstName} ${newUser.lastName}`
    };
    localStorage.setItem('user', JSON.stringify(_user));
    dispatch({type: ActionTypes.SET_USER, user: {..._user}});
    toast({
      title: `User updated`,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    closeEditForm();
  }

  const isChanged = () => {
    const _user = getValues();
    return (
      _user.firstName === user?.firstName &&
      _user?.lastName === user?.lastName &&
      _user?.email === user?.email
    )
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>Edit</Text>
      </Flex>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input  
            { ...register('firstName') } 
            id="firstName" 
            type="text"
          />
          {
              !!errors?.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
          }
      </FormControl>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.lastName}>
          <FormLabel>Last Name</FormLabel>
          <Input  
            { ...register('lastName') }
            id="lastName" 
            type="text"
          />
          {
              !!errors?.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
          }
      </FormControl>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.email}>
          <FormLabel>Email</FormLabel>
          <Input  
            { ...register('email') } 
            id="email" 
            type="text"
          />
          {
              !!errors?.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          }
      </FormControl>
      <FormControl mt='2em' ml='1em' mb='1em'>
        <Button  
          isLoading={loading} 
          type="submit" 
          name="Login" 
          bg='#c2a400'
          color='whitesmoke'
          _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          // isDisabled={}
        >
          Update
        </Button>
      </FormControl>

    </form>
  )
}

export default memo(EditProfileForm)