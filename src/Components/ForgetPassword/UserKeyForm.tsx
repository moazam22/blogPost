import { memo } from "react";
import { 
  Flex, 
  Text, 
  FormControl, 
  FormLabel, 
  Input, 
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react";
import {useForm} from 'react-hook-form';
import { ForgotPasswordMutation, ForgotPasswordMutationVariables, useForgotPasswordMutation } from "../../generated/graphql";
import {userKey} from '../../utils/FormScemas';
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  changeUserKey: (data: null | string) => void;
}

const UserKeyForm: React.FC <Props> = ({ changeUserKey }) => {
  const toast = useToast();
  const {register, handleSubmit, formState: {errors}} 
    = useForm<ForgotPasswordMutationVariables>({
      resolver: yupResolver(userKey),
    });
  const [forgotPasswordMutation, { loading }] = 

  useForgotPasswordMutation({
    onCompleted: (response: ForgotPasswordMutation)=>onGetUserKey(response),
    onError: () => toast({
      title: `Couldn't find email.`,
      status: 'error',
      isClosable: true,
      position: 'top',
    })
  })

  const onSubmit = (data: ForgotPasswordMutationVariables/* LoginUserInput */) => {
    forgotPasswordMutation({
      variables: {
        email: data.email
      }
    })
  }

  const onGetUserKey = (data: ForgotPasswordMutation) => {
    if(!!data?.forgotPassword?.userKey)
      changeUserKey(data.forgotPassword.userKey);
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>Forgot Password</Text>
      </Flex>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.email}>
          <FormLabel>Enter Your Email</FormLabel>
          <Input  
            { ...register('email') } 
            id="email" 
            type="text"
            placeholder="Email"
          />
          {
              !!errors?.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          }
      </FormControl>
      <FormControl mt='2em' ml='1em' mb='1em'>
          <Button  
            isLoading={loading} 
            type="submit" 
            name="submit" 
            bg='#c2a400'
            color='whitesmoke'
            _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          >
            Submit
          </Button>
      </FormControl>
    </form>
  )
}

export default memo(UserKeyForm);