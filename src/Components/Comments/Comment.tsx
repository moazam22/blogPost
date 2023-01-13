import React, { useState, useCallback, useContext } from 'react';
import { Flex, Text, Divider, useToast } from '@chakra-ui/react';
import { 
  PostComment, 
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../generated/graphql';
import AddComment from './AddComment';
import { GlobalContext } from '../../Context/GlobalProvider';

interface Props {
    comment: PostComment;
    hideDivider: boolean;
    postId: string;
    refetchPosts: ()=>void;
}

const ShowComment: React.FC<Props> = 
({
    comment, 
    hideDivider, 
    postId,
    refetchPosts,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showAddCommentSection, setShowAddCommentSection] = useState(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const {user} = useContext(GlobalContext);
  const [deleteCommentMutation, { loading, }] = 
    useDeleteCommentMutation({
      onCompleted: ()=>onSuccess('Comment deleted'),
      onError: () => showErrorToaster(`Couldn't delete comment`),
    })
  const [updateCommentMutation,] = 
    useUpdateCommentMutation({
      onCompleted: () => onSuccess('Comment updated'),
      onError: () => showErrorToaster(`Couldn't edit comment`),
    });
  const toast = useToast();

  const closeCommentSection = useCallback(() => {
    setShowAddCommentSection(false);
  }
  ,[]);

  const handleCommentDelete = () => {
    deleteCommentMutation({
      variables: {
        commentId: comment.id,
      },
    })
  }

  const showErrorToaster = (message: string) => {
    return (
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    );
  }

  const handleCommentEdit = () => {
    setEditComment(!editComment);
  }

  const updateComment = (commentBody: string) => {
    const payload = {
      commentBody,
      commentId: comment.id
    }
    updateCommentMutation({
      variables: {
        updateCommentInput: payload
      },
    })
  }

  const onSuccess = (message: string) => {
    refetchPosts();
    toast({
      title: message,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    setShowAddCommentSection(false);
    setEditComment(false);
  }

  const replyLabel = Array.isArray(comment?.reply) 
    ? comment.reply.length === 1 ? `show 1 reply` : `show ${comment.reply.length} replies`
    : null;

  const isCommentReplies = Array.isArray(comment.reply) &&  !!comment?.reply?.length && comment.reply.length;
  
  return (
    <Flex flexDirection='column'>
      <Flex flexDirection='column'>
        <Flex w='100%' px='5px'>
            <Text fontSize='14px' 
              mr='1em' 
              color='#c2a400' 
              fontWeight='500'
              textDecoration='underline'
            >
              {comment?.user?.fullName}:
            </Text>
            <Text fontSize='14px' mr='1em' wordBreak='break-all'>{comment?.commentBody}</Text> 
        </Flex>
          <Flex w='100%' justifyContent='flex-end' pr='1em'>  
            <Text 
              fontSize='13px' 
              textDecoration='underline' 
              opacity='0.5'
              cursor='pointer'
              ml='1em'
              _hover={{opacity: '1', color: '#c2a400'}}
              onClick={()=>!loading && setShowAddCommentSection(!showAddCommentSection)}
            >
              {'Reply'}
            </Text>
            {
              comment?.user?.id === user?.id &&(
                <>
                  <Text 
                    ml='1em'
                    fontSize='13px' 
                    textDecoration='underline' 
                    opacity='0.5'
                    cursor='pointer'
                    _hover={{opacity: '1', color: '#bd2828'}}
                    onClick={handleCommentDelete}
                  >
                    {`Delete`}
                  </Text>
                  <Text 
                    ml='1em'
                    fontSize='13px' 
                    textDecoration='underline' 
                    opacity='0.5'
                    cursor='pointer'
                    _hover={{opacity: '1', color: '#00006e'}}
                    onClick={handleCommentEdit}
                  >
                    {`Edit`}
                  </Text>
                </>
              )
            }
          </Flex>
        {
          !hideDivider && <Divider mt='0' mb='0' bg='grey' h='0.5px'/>
        }  
      </Flex>
      {
        (Array.isArray(comment?.reply) && !!comment?.reply?.length)
        && 
        (
          <Flex w='100%' mb='0.2em' justifyContent='center'>
            <Text 
              fontSize='13px' 
              textDecoration='underline' 
              opacity='0.5'
              cursor='pointer'
              _hover={{opacity: '1', color: '#c2a400'}}
              onClick={()=>setShowReplies((prevShowReplies) => !prevShowReplies)}
            >
              {replyLabel}
            </Text>            
          </Flex>
        )
      }
      {
        isCommentReplies && !!showReplies && (
          comment?.reply?.length && comment.reply.map((reply) => {
            return(
              <ShowComment 
                key={reply.id} 
                comment={reply} 
                hideDivider={true} 
                postId={postId}
                refetchPosts={refetchPosts}
              />
            )
          })
        )
      }
      <AddComment 
        showAddCommentSection={showAddCommentSection} 
        postId={postId}
        closeCommentSection={closeCommentSection} 
        refetchPosts={refetchPosts}
        parentId={comment.id}
        editComment={editComment}
        updateComment={updateComment}
        commentBody={comment?.commentBody}
      />
    </Flex>
  )
}

export default ShowComment;