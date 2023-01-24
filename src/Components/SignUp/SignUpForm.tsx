import { ApolloError } from '@apollo/client';
import {
  Button, Flex, FormControl, Text, useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../Context/AppReducer';
import { GlobalContext } from '../../Context/GlobalProvider';
import { CreateUserInput, SignUpMutation, useSignUpMutation } from '../../generated/graphql';
import { passwordConst } from '../../utils';
import { signupSchema } from '../../utils/FormScemas';
import InputField from '../InputField/InputField';

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const signupForm = useForm<CreateUserInput>({
    resolver: yupResolver(signupSchema),
  });

  const { handleSubmit } = signupForm;

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

  const toggleShowPass = useCallback(() => setShowPass((prevShowPass) => !prevShowPass),[]);

  return (
    <FormProvider {...signupForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
            <Text fontSize='xl' fontWeight='500'>Sign Up</Text>
        </Flex> 
        
        <InputField 
          label = {'First Name'}
          name = {'firstName'}
          type = {'text'}
        />

        <InputField 
          label = {'Last Name'}
          name = {'lastName'}
          type = {'text'}
        />

        <InputField 
          label = {'Email'}
          name = {'email'}
          type = {'text'}
        />

        <InputField 
            label = {'Password'}
            name = {passwordConst}
            type = {passwordConst}
            toggleShowPass = {toggleShowPass}
            showPass = {showPass}
        />

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
    </FormProvider>
  )
}

export default SignUpForm;