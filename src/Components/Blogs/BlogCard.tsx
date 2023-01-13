import React, { useState, useCallback } from 'react';
import { Post } from '../../generated/graphql';
import {
  PostBody,
  PostContainer,
  PostLowerSection,
  PostTitle,
  PostLinkSection,
} from "./BlogContainer.styled";
import { Image, Flex, Spinner, useToast } from '@chakra-ui/react';
import CommentList from '../Comments/CommentsList';
import AddComment from '../Comments/AddComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeletePostMutation } from '../../generated/graphql';
import { useNavigate } from 'react-router-dom';
import styles from './Blogs.module.css';

interface Props {
  blog: Post,
  isMyPosts: boolean;
  refetchPosts: ()=> void;
}

const PostCard: React.FC<Props> = ({ blog, isMyPosts, refetchPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [showAddCommentSection, setShowAddCommentSection] = useState(false);
  const [deletePostMutation, { loading }] = useDeletePostMutation({
    onCompleted: () => onPostDelete(), onError: ()=>onPostDeleteError()
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleCommentClick = () => {
    setShowComments(!showComments);
  }

  const closeCommentSection = useCallback(() => {
    setShowAddCommentSection(false);
  },[]);

  const deletePost = () => {
    deletePostMutation({
      variables: {
        postId: blog.id,
      }
    })
  }

  const onPostDelete = () => {
    toast({
      title: `Post deleted.`,
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    refetchPosts();
  }

  const onPostDeleteError = () => {
    toast({
      title: `Couldn't delete post.`,
      status: 'error',
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <PostContainer>
      <Flex w='100%' justifyContent='flex-end'>
        {
          !!isMyPosts && (
            <FontAwesomeIcon 
              icon={faEdit} 
              color='#2424b4' 
              cursor='pointer' 
              className={styles.editIconStyyle}
              onClick={()=>navigate(`/edit-post/${blog.id}`)}
            />    
          )
        }
        {
          !!isMyPosts && (
            !!loading ? (
              <Spinner mt='10px' ml='10px' h='10px' w='10px' color='#c2a400' />
            ) : (
              <FontAwesomeIcon 
                icon={faTrash} 
                color='#b72217' 
                cursor='pointer' 
                className={styles.trashIconStyle}
                onClick={deletePost}
              />
            )
          )
        }
        
      </Flex>
      <PostTitle>
        {blog.title}
      </PostTitle>
      <PostBody>
        {blog.description}
        {
          !!blog?.attachmentUrl && (
            <Image 
              alt='attachment' 
              src={blog.attachmentUrl} 
              h='300px' 
              w='300px' 
              objectFit='cover'
            />
          )
        }
      </PostBody>
      <PostLowerSection>
      <PostLinkSection>
        <div
          className={styles.postCardButtons}
          onClick={() => setShowAddCommentSection((prevVal)=>!prevVal)}
        >
            {`Add Comment`}
      </div>
      </PostLinkSection>
        <PostLinkSection>
          <div
            className={styles.postCardButtons}
            onClick={handleCommentClick}
          >
            {`(${blog?.postComments?.length}) Comments`}
          </div>
        </PostLinkSection>
      </PostLowerSection>
      <CommentList 
        showComments={showComments}  
        blogId={blog.id}
        postComments={blog.postComments}
        refetchPosts={ refetchPosts }
      />
      <AddComment 
        showAddCommentSection={showAddCommentSection} 
        postId={blog?.id}
        closeCommentSection={closeCommentSection} 
        refetchPosts={ refetchPosts }
      />
    </PostContainer>
  )
}

export default PostCard;