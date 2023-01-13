import { useState, useEffect } from "react";
import { UpdatePostInput, useFetchPostLazyQuery, useUpdateUserPostMutation } from "../../generated/graphql";
import { FetchPostQuery } from "../../generated/graphql";
import {
  Flex,
  Text,
  useToast,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { ApolloError } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPost } from "../../utils/FormScemas";

const EditPost = () => {
  const [postId, setPostId] = useState<null|string|undefined>(null);
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<UpdatePostInput>({
    resolver: yupResolver(editPost),
  });
  
  const [ fetchPostData, {data: formData, loading: loadingFormData,} ] = 
    useFetchPostLazyQuery({
      onCompleted: (data: FetchPostQuery)=> setFormFields(data),
      onError:(error)=>handleError(error, `Couldn't fetch data`)
    });

    const [updateUserPostMutation] =
    useUpdateUserPostMutation({
      onCompleted: ()=> onSuccess(),
      onError:(error)=>handleError(error, `Couldn't update data`)
    });

  const toast = useToast();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    if(!postId){
      const {id} = params;
      if(!!id && !formData){
        fetchPostData({
          variables: {
            postId: id
          },
        })
      }
      setPostId(id);
    }
  },[postId]);

  const setFormFields = (formData: FetchPostQuery) => {
    setValue('title', formData?.fetchPost?.title!);
    setValue('description', formData?.fetchPost?.description!);
  }

  const handleError = (error: ApolloError, message: string) => {
    console.error(error.message);
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
  }

  const onSubmit = (data: UpdatePostInput) => {
    if(!!postId){
      data['postId'] = postId;
      updateUserPostMutation({
        variables: {
          updatePostInput: data 
        },
      })
    }
  }

  const onSuccess = () => {
    toast({
      title: 'Post updated',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    navigate('/my-posts');
  }

  return (
    !!loadingFormData ? (
      <Flex w='100%' justifyContent='center' alignItems='center' padding='8em'>
        <Spinner  ml='10px' h='30px' w='30px' color='#c2a400'/>
        <Text ml='2em'>Loading form data</Text>
      </Flex>
    ) : (
      <form  onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml='1em' justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>New Post</Text>
      </Flex>
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.title}>
          <FormLabel>Title</FormLabel>
          <Input  
            { ...register('title',) } 
            id="title" 
            type="text"
          />
          {
              !!errors?.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          }
      </FormControl> 
      
      <FormControl mt='1em' w='95%' ml='1em' isInvalid={!!errors?.description}>
          <FormLabel>Description</FormLabel>
              <Textarea
                { ...register('description') }
                id="description" 
                pr='4.5rem'
                placeholder='Enter description'
              />
          {
              !!errors?.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          }
      </FormControl>  

      <FormControl mt='2em' ml='1em' mb='1em'>
          <Button  
            isLoading={loadingFormData}
            disabled={loadingFormData}
            loadingText={'Submitting'} 
            type="submit" 
            name="Update Post" 
            bg='#c2a400'
            color='whitesmoke'
            _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          >
            Update
          </Button>
      </FormControl>
      </form>
    )
  )
}

export default EditPost