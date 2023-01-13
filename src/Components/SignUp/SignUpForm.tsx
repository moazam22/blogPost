import { useContext, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useSignUpMutation,CreateUserInput, SignUpMutation } from '../../generated/graphql';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes } from '../../Context/AppReducer';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalProvider';
import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../utils/FormScemas';

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<CreateUserInput>({
    resolver: yupResolver(signupSchema),
  });
  const {dispatch} = useContext(GlobalContext);
  const navigate = useNavigate();

  const [signUpMutation, { loading, error }] = useSignUpMutation({
    onCompleted: (data: SignUpMutation) =>onSignupSuccess(data), onError: (err: ApolloError)=> showErrorToaster(err)
  });

  const toast = useToast();

  const onSubmit = (data: CreateUserInput) => {
    signUpMutation({
      variables: {
        signUpUserInput: data
      }
    });
  }

  const onSignupSuccess = (data: SignUpMutation) => {
    const {signUp} = data;
    if(signUp?.access_token){
      localStorage.setItem('user', JSON.stringify(signUp));
      dispatch({type: ActionTypes.SET_USER, user: {...signUp}});
      navigate('/blogs');
    }else{
      showErrorToaster(null);
    }
  }

  const showErrorToaster = (err: ApolloError | null) => {
    return (
      toast({
        title: !!error?.message ? error.message : !!err?.message ? err.message : 'Login Failed',
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    );
  }

  const toggleShowPass = () => setShowPass((prevShowPass) => !prevShowPass);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>Sign Up</Text>
      </Flex>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input  
            {...register('firstName', 
                // {
                //   required: 'First Name is required.'
                // }
              )
            } 
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
            {...register('lastName', 
                // {
                //   required: 'Last Name is required.'
                // }
              )
            } 
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
            {...register('email', 
                // {
                //   required: 'Email is required.'
                // }
              )
            } 
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
            Sign up & Login
          </Button>
          <Text 
            fontSize='14px' 
            textDecoration='underline' 
            color='#c2a400'
            cursor='pointer'
            onClick={()=>navigate('/')}
            _hover={{ color: '#0a0ab4'}}
          >
            Already have an account? Go-to Login
          </Text>
        </Flex>  
      </FormControl>
    </form>
  )
}

export default SignUpForm;