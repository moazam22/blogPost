import { SyntheticEvent, useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { 
  FormControl, 
  FormLabel, 
  Input,  
  Button,
  FormErrorMessage,
  Textarea,
  useToast,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from '@chakra-ui/react';
import { CreatePostInput, useCreatePostMutation } from '../../generated/graphql';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../../firebase';
import {ref, uploadBytes, getDownloadURL, StorageReference} from 'firebase/storage';
import {v4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { newPost } from '../../utils/FormScemas';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './Datepicker.module.css';

interface PostData {
  attachmentUrl?: File[];
  description: string;
  readTime?: string;
  title: string;
}

const NewPost = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(null);
  const {register, handleSubmit, reset, setValue, resetField, formState: {errors}} 
    = useForm<PostData>({
      resolver: yupResolver(newPost),
    });
  const [createPostMutation, { loading }] = useCreatePostMutation({
    onCompleted: ()=>postCreated(), onError: (error)=>handleError(error, `Couldn't create post`)
  });
  
  const toast = useToast();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if(!!selectedDate)
      setValue('readTime',moment(selectedDate).format('YYYY-MM-DD'))
  },[selectedDate]);

  const handleError = (error: ApolloError, message: string) => {
    console.error(error.message);
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
  }

  const onSubmit = async(data: PostData) => {
    let url = null;
    if(!!data?.readTime)
    if(!!data?.attachmentUrl?.length){
      const imageRef = ref(storage, `image/${data.attachmentUrl[0].name + v4()}`);
      url = await uploadImage(imageRef, data.attachmentUrl[0]);
    }
    const payload : CreatePostInput = {
      attachmentUrl: url,
      description: data.description,
      readTime: data.readTime,
      title: data.title,
    };
    createPostMutation({
      variables: {
        createPostInput: payload
      }
    });
  }

  const uploadImage = async (folder: StorageReference, file: Blob | Uint8Array | ArrayBuffer  ) => {
    let url = null;
    try{
      setIsUploading(true);
      const uploaded = await uploadBytes(folder, file);
      if(!!uploaded){
        try {
          url = await getDownloadURL(folder);
          setIsUploading(false);
          return url;
        } catch (err) {
          console.error("Something went wrong while fetching image url: ", err);
          return null;
        }
      }
    }catch(err){
      console.error('Something went wrong while uploading file to cloud. Error: ', err);
      return null;
    }
  }

  const postCreated = () => {
    toast({
      title: 'Post created',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    reset();
    navigate('/blogs');
  }

  const handleDateChange = (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => {
    setSelectedDate(date);
  };

  const marginLeft = !!isMobile ? '5px' : '1em';

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Flex  mt='1em' w='95%' ml={marginLeft} justifyContent='center' alignItems='center'>
          <Text fontSize='xl' fontWeight='500'>New Post</Text>
      </Flex>
      <FormControl mt='1em' w='95%' ml={marginLeft} isInvalid={!!errors?.title}>
          <FormLabel>Title</FormLabel>
          <Input  
            { ...register('title') } 
            id="title" 
            type="text"
            placeholder='Enter Title'
          />
          {
              !!errors?.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          }
      </FormControl> 
      
      <FormControl mt='1em' w='95%' ml={marginLeft} isInvalid={!!errors?.description}>
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

      <FormControl mt='1em' w='95%' ml={marginLeft} isInvalid={!!errors?.readTime}>
      <FormLabel>Read Time</FormLabel>
          <DatePicker
            { ...register('readTime') }
            minDate={new Date()}
            onChange={handleDateChange}
            className={styles.datePickerStyle}
            selected={!!selectedDate ? new Date(selectedDate) : null}
          />
        {
          !!errors?.readTime && <FormErrorMessage>{errors.readTime.message}</FormErrorMessage>
        }
      </FormControl> 

      <FormControl mt='1em' w='95%' ml={marginLeft} >
          <FormLabel>Attachment</FormLabel>
          <InputGroup>
            <Input  
              {...register('attachmentUrl')} 
              id="attachmentUrl" 
              type="file"
              accept="image/*"
              pt='3px'
              cursor={'pointer'}
            />
            <InputRightElement width='4.5rem'>
                <FontAwesomeIcon 
                  cursor='pointer' 
                  icon={faClose} 
                  onClick={() => resetField('attachmentUrl')}
                />
              </InputRightElement>
          </InputGroup>
      </FormControl>

      <FormControl mt='2em' ml={marginLeft} mb='1em'>
          <Button  
            isLoading={loading || isUploading}
            disabled={loading || isUploading}
            loadingText={loading ? 'Submitting' : isUploading ? 'Uploading' : ''} 
            type="submit" 
            name="Create Post" 
            bg='#c2a400'
            color='whitesmoke'
            _hover={{bg: '#c2a400', color: 'whitesmoke'}}
          >
          Create
          </Button>
      </FormControl>
    </form>
  )
}

export default NewPost;