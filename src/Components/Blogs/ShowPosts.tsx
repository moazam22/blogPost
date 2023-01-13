import { memo } from "react";
import {  Post } from "../../generated/graphql"
import { ApolloError } from "@apollo/client";
import { EmptyList,RowFlex, ColFlex } from "../Styled/ListBlogs.Styled";
import { ReactComponent as BlogSvg } from '../../Assets/Blog.svg';
import { Spinner, Flex, } from "@chakra-ui/react";
import PostCard from "./BlogCard";
import { BodyContainer, LowerSection } from "./BlogContainer.styled";
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from "../SearchBar/SearchBar";
import { SearchPostQueryVariables } from "../../generated/graphql";
import styles from './Blogs.module.css';

interface Props {
  posts: Post[] | undefined;
  totalPosts: number;
  loading: boolean;
  error: ApolloError | undefined;
  isMyPosts: boolean;
  showSearchBar?: boolean;
  searchLoading?: boolean;
  isFilterApplied?: boolean;
  loadMoreBlogs: ()=>void;
  refetchPosts: ()=>void;
  onSearch?: (_str: SearchPostQueryVariables) => void;
  resetFilter?: () => void;
}

const ShowPosts: React.FC <Props> = ({
  posts,
  totalPosts,
  loading,
  error,
  isMyPosts,
  showSearchBar,
  searchLoading,
  isFilterApplied,
  loadMoreBlogs,
  refetchPosts,
  onSearch,
  resetFilter,
}) => {

  return (
    <>
    {
      !!error ? (
      <EmptyList>
        <RowFlex>
          <BlogSvg height='35px' width='35px' fill='#c2a400' />
          <div className={styles.errorMessageContainer}>{`Oops! Error occured!`}</div>
        </RowFlex>
      </EmptyList>
      ): !!loading ? (
        <EmptyList>
          <RowFlex>
            <BlogSvg height='35px' width='35px' fill='#c2a400' />
            <Flex w='100%' justifyContent='center' alignItems='center'>
              <div>{`Loading`}</div>
              <Spinner ml='10px' h='10px' w='10px' color='#c2a400' />
            </Flex>
          </RowFlex>
        </EmptyList>
      ) : !posts?.length ? (
          <EmptyList>
            <RowFlex>
              <BlogSvg height='35px' width='35px' fill='#c2a400' />
              <div className={styles.errorMessageContainer}>No Blogs Yet.</div>
            </RowFlex>
          </EmptyList>
      ) : (
        <BodyContainer>
          <LowerSection>
            {
              !!showSearchBar 
              &&
              <SearchBar onSearch={onSearch} searchLoading={searchLoading} resetFilter={resetFilter}/>
            }
            <ColFlex>
              <InfiniteScroll
                dataLength={!!posts?.length ? posts.length: 0} //This is important field to render the next data
                next={loadMoreBlogs}
                hasMore={(posts?.length !== totalPosts) && (!isFilterApplied)}
                loader={
                  <Flex w='100%' justifyContent='center'>
                    <Spinner mb='1em' h='40px' w='40px' color='#c2a400' />
                  </Flex>
                }
                height={showSearchBar ? 600 : 680}
              >
                {
                  !!posts?.length && posts.map((blog: Post) => {
                    return (
                      <PostCard 
                        key={blog.id}
                        blog={blog}
                        refetchPosts={refetchPosts}
                        isMyPosts={isMyPosts}
                      />
                    )
                  })
                }
              </InfiniteScroll>
          </ColFlex>
          </LowerSection>
        </BodyContainer>
      ) 
    }
    </>
  )
}

export default memo(ShowPosts);