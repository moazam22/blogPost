import { memo, useEffect } from "react";
import { 
  Collapse, 
  InputGroup, 
  InputRightElement, 
  Input, 
  Flex, 
  FormControl,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { CreateCommentInput } from "../../generated/graphql";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useCreatePostCommentMutation } from "../../generated/graphql";
import { commentFormSchema } from "../../utils/FormScemas";
import styles from '../SearchBar/SearchBar.module.css';
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  showAddCommentSection?: boolean;
  postId: string;
  parentId?: string;
  editComment?: boolean;
  commentBody?: string;
  closeCommentSection: ()=>void;
  refetchPosts: ()=>void;
  updateComment?: (data: string)=>void;
}

const AddComment: React.FC<Props> = ({
    showAddCommentSection, 
    postId, 
    parentId,
    editComment,
    commentBody,
    closeCommentSection,
    refetchPosts,
    updateComment,
  }) => {
  const addCommentForm = useForm<CreateCommentInput>({
    resolver: yupResolver(commentFormSchema),
  });
  const {register, handleSubmit, reset, setValue, getValues, control, formState: {errors}} = addCommentForm;
  const [createPostCommentMutation, { loading }] 
    = useCreatePostCommentMutation(
    {
      onCompleted: ()=>{onAddingComment()},
        onError: ()=>{onAddingCommentFailed()}
    }
  );
  const toast = useToast();

  useEffect(()=>{
    if(!!editComment && !!commentBody){
      setValue('commentBody', commentBody); 
    }
  },[editComment,commentBody]);


  const onSubmit = (data: CreateCommentInput) => {
    data= !!parentId ? {...data, postId, parentId} : {...data, postId};
    createPostCommentMutation({
      variables: {
        createCommentInput: data,
      }
    })    
  };

  const onAddingComment = () => {
    reset();
    closeCommentSection();
    toast({
      title: `Comment posted.`,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    refetchPosts();
  }

  const onAddingCommentFailed = () => {
    toast({
      title: `Couldn't post comment, try again!`,
      status: 'error',
      isClosable: true,
      position: 'top',
    });
  }

  const handleEditComment = () => {
    const commentBody = getValues('commentBody');
    if(!!updateComment)
      updateComment(commentBody);
  }

  return (
    <Collapse in={showAddCommentSection || editComment} animateOpacity>
      <Flex w='100%' mt='0.5em' mb='1em'>
      <FormProvider {...addCommentForm}>
        <form className={styles.formWidth} onSubmit={!!editComment ? handleSubmit(handleEditComment) : handleSubmit(onSubmit)}>  
         
          <Controller
            name='commentBody'
            control = {control}
            defaultValue=''
            render = {({field, fieldState: {error: {message} = {}}}) => (
              <FormControl isInvalid={!!message} px='0.5em'>
                <InputGroup >
                  <Input
                    {...field}
                    type='text'
                    placeholder="Type here..."
                    disabled={loading}
                  />
                  <InputRightElement>
                  {
                    !!loading 
                    ?
                      <Spinner h='10px' w='10px' color='#c2a400' /> 
                    :
                      <FontAwesomeIcon 
                        icon={faPaperPlane}
                        color='#c2a400'
                        cursor='pointer'
                        onClick={() => !!editComment ? handleSubmit(handleEditComment)() :  handleSubmit(onSubmit)()}
                      />
                  }
                  </InputRightElement>
                </InputGroup>
                {
                  !!message && <FormErrorMessage>{message}</FormErrorMessage>
                }
              </FormControl>
            )}
          />
        </form>
      </FormProvider>
      </Flex>
    </Collapse>
  )
}

export default memo(AddComment);