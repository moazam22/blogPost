import { useState , useContext} from 'react';
import {useForm} from 'react-hook-form';
import { 
    FormControl, 
    FormLabel, 
    Input,  
    Button,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    useToast,
    Flex,
    Text,
} from '@chakra-ui/react';
import { 
  LoginUserInput, 
  useLoginMutation,
  LoginMutation,
} from '../../generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../Context/GlobalProvider';
import { ActionTypes } from '../../Context/AppReducer';
import { useNavigate } from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/FormScemas';
import { makeSocketConnection, gteOnlineUsers } from '../../utils/ReuseableFuctions';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<LoginUserInput>({
    resolver: yupResolver(loginSchema), 
  });
  
  const [loginMutation, { loading, error }] = 
    useLoginMutation({onCompleted: (data: LoginMutation)=>onLogin(data), onError: ()=>showErrorToaster()});
  
  const { dispatch } = useContext(GlobalContext);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: LoginUserInput) => {
    loginMutation({
      variables: {
        loginUser: data
      }
    });
  }

  const onLogin = async (data: LoginMutation) => {
    const {login} = data;
    if(login?.access_token){
      let socket = makeSocketConnection(login.access_token);
      if(!!socket)
        gteOnlineUsers(socket, dispatch);
      localStorage.setItem('user', JSON.stringify(login));
      dispatch({type: ActionTypes.SET_USER, user: {...login}});
      dispatch({type: ActionTypes.SET_SOCKET, socket: !!socket ? socket : null});
      navigate('/blogs');
    }else{
      showErrorToaster();
    }
  }

  const showErrorToaster = () => {
    return (
      toast({
        title: !!error?.message ? error.message : 'Login Failed',
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    );
  }
  
  const toggleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>Login</Text>
      </Flex>
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
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.password}>
          <FormLabel>Password</FormLabel>
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
        <Flex w='90%' alignItems='center' justifyContent='space-between'>
          <Button  
            isLoading={loading} 
            type="submit" 
            name="Login" 
            bg='#c2a400'
            color='whitesmoke'
            _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          >
            Login
          </Button>
          <Flex direction='column' alignItems='flex-start'>
            <Text 
              fontSize='14px' 
              textDecoration='underline' 
              color='#c2a400'
              cursor='pointer'
              onClick={()=>navigate('/sign-up')}
              _hover={{ color: '#0a0ab4'}}
            >
              Don't have an account? Sign-up
            </Text>
            <Text 
              fontSize='14px' 
              textDecoration='underline' 
              color='#c2a400'
              cursor='pointer'
              onClick={()=>navigate('/forget-password')}
              _hover={{ color: '#0a0ab4'}}
            >
              Forget Password?
            </Text>
          </Flex>
          
        </Flex>
      </FormControl>
    </form>
  )
}

export default LoginForm