import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { FetchAllPostsQuery, FetchUserPostsQuery, Post, SearchPostQueryVariables } from "../../generated/graphql";
import { paginationLimit } from "../../utils";
import ShowPosts from "./ShowPosts";

interface RefetchArgType{
  paginateInput: {
    page: number;
    limit: number;
  }
}

interface Props {
  data?: FetchAllPostsQuery | undefined;
  userPostsData?: FetchUserPostsQuery | undefined;
  posts: Post[] | undefined;
  totalPosts: number;
  loading: boolean;
  error: ApolloError | undefined;
  searchLoading?: boolean;
  isFilterApplied?: boolean;
  page: number;
  isMyPosts?: boolean;
  onSearch?: (_str: SearchPostQueryVariables) => void;
  resetFilter?: () => void;
  loadMoreBlogs: () => void;
  refetch: (arg: RefetchArgType) => void;
}

const Blogs: React.FC<Props> = ({
  data,
  posts,
  totalPosts,
  loading,
  error,
  searchLoading,
  isFilterApplied,
  page,
  userPostsData,
  isMyPosts,
  onSearch,
  resetFilter,
  loadMoreBlogs,
  refetch,
}) => {

  useEffect(()=>{
    if(!!data || !!userPostsData){ // if there isn't data then it get data from initial fetch...
      refetchPosts();
    }
  },[]);

  const refetchPosts = () => {
    refetch({
      paginateInput: {
        page: 1,
        limit: (page - 1) * paginationLimit,
      }
    });
  }

  return (
    <ShowPosts 
      posts = { posts }
      totalPosts = { totalPosts }
      loading = {loading}
      error = {error}
      isMyPosts = {!!isMyPosts}
      showSearchBar = {!isMyPosts}
      searchLoading={searchLoading}
      loadMoreBlogs = {loadMoreBlogs}
      refetchPosts = { refetchPosts }
      onSearch={onSearch}
      resetFilter={resetFilter}
      isFilterApplied = {isFilterApplied}
    />
  )
}

export default Blogs;