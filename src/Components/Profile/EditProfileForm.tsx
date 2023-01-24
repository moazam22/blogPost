import {
  Button, Flex, FormControl, Text, useToast
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import {
  UpdateUserInput, useUpdateUserMutation
} from "../../generated/graphql";
import { updateUser } from '../../utils/FormScemas';
import InputField from "../InputField/InputField";

interface Props {
  closeEditForm: ()=>void;
}

const EditProfileForm: React.FC<Props> = ({closeEditForm}) => {
  const editProfileForm = useForm<UpdateUserInput>({
      resolver: yupResolver(updateUser),
  });
  const {handleSubmit, getValues, formState: {errors}} = editProfileForm;
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
    <FormProvider {...editProfileForm}>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
            <Text fontSize='xl' fontWeight='500'>Edit</Text>
        </Flex>

        <InputField
          label={'First Name'}
          name={'firstName'}
          type={'text'}
          defaulValue={user?.firstName}
        />

        <InputField
          label={'Last Name'}
          name={'lastName'}
          type={'text'}
          defaulValue={user?.lastName}
        />

        <InputField
          label={'Email'}
          name={'email'}
          type={'text'}
          defaulValue={user?.email}
        />

        <FormControl mt='2em' ml='1em' mb='1em'>
          <Button  
            isLoading={loading} 
            type="submit" 
            name="Login" 
            bg='#c2a400'
            color='whitesmoke'
            _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          >
            Update
          </Button>
        </FormControl>

      </form>
    </FormProvider>
  )
}

export default memo(EditProfileForm)