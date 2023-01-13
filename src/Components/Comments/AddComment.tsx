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
import { useForm } from "react-hook-form";
import { useCreatePostCommentMutation } from "../../generated/graphql";
import styles from '../SearchBar/SearchBar.module.css';

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
  const {register, handleSubmit, reset, setValue, getValues, formState: {errors}} = useForm<CreateCommentInput>();
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
        <form className={styles.formWidth} onSubmit={!!editComment ? handleSubmit(handleEditComment) : handleSubmit(onSubmit)}>  
          <FormControl isInvalid={!!errors?.commentBody} px='0.5em'>
            <InputGroup >
              <Input
                {...register('commentBody', 
                    {
                      required: 'Comment is required.'
                    }
                  )
                } 
                type='text'
                placeholder="Type here..."
                disabled={loading}
              />
              {
                !!errors?.commentBody && <FormErrorMessage>{errors.commentBody.message}</FormErrorMessage>
              }
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
          </FormControl>
        </form>
      </Flex>
    </Collapse>
  )
}

export default memo(AddComment);