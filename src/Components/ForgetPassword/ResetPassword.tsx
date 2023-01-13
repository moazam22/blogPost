import { useState } from 'react';
import {
  Flex,
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  Button, 
  Text,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useUpdatePasswordMutation, UpdatePasswordInput } from '../../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/FormScemas';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  userKey: string;
}

const ResetPassword: React.FC <Props> = ({userKey}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const {register, handleSubmit, formState: {errors}} 
    = useForm<UpdatePasswordInput>({
      resolver: yupResolver(resetPassword),
    });
  
  const [updatePasswordMutation, { loading }] = useUpdatePasswordMutation({
    onCompleted: () => onPassChangeComplete(),
    onError: () => onPassChangeError(),
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: UpdatePasswordInput) => {
    data['userKey'] = userKey;
    updatePasswordMutation({
      variables: {
        passwordUpdateInput: data
      }
    });
  }

  const toggleShowPass = () => setShowPass(!showPass);

  const onPassChangeComplete = () => {
    toast({
      title: `Password updated.`,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    navigate('/login');
  }

  const onPassChangeError = () => {
    toast({
      title: `Couldn't update password, Try again!`,
      status: 'error',
      isClosable: true,
      position: 'top',
    });
  }
  
  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
    <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
        <Text fontSize='xl' fontWeight='500'>Reset Password</Text>
    </Flex>
    <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.password}>
          <FormLabel>New Password</FormLabel>
           <InputGroup size='md'>
              <Input
                { ...register('password') }
                id="password" 
                pr='4.5rem'
                type={showPass ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <FontAwesomeIcon 
                  cursor='pointer' 
                  icon={showPass ? faEye : faEyeSlash} 
                  onClick={toggleShowPass}
                />
              </InputRightElement>
            </InputGroup>
          {
              !!errors?.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          }
    </FormControl>
  
    <FormControl mt='2em' ml='1em' mb='1em'>
        <Button  
          isLoading={loading} 
          type="submit" 
          name="Reset" 
          bg='#c2a400'
          color='whitesmoke'
          _hover={{bg: '#c2a400', color: 'whitesmoke'}}
        >
          Reset
        </Button>
    </FormControl>
  </form>
  )
}

export default ResetPassword