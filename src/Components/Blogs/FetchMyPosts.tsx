import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import {  useFetchUserPostsQuery } from "../../generated/graphql";
import { useEffect } from "react";
import { ActionTypes } from "../../Context/AppReducer";
import ShowPosts from "./ShowPosts";

const paginationLimit = 3;

const FetchMyPosts = () => {
  const { myPostPage, dispatch } = useContext(GlobalContext);
  
  const { data, loading, error, fetchMore, refetch } = useFetchUserPostsQuery({
    variables: {
      paginateInput: {
        page: 1,
        limit: paginationLimit,
      }   
    }
  });

  useEffect(()=>{
    if(!!data){ // if there isn't data then it get data from initial fetch...
      refetchPosts();
    }
  },[]);

  const loadMoreBlogs = () => {
    fetchMore({
      variables: {
        paginateInput: {
          page: myPostPage,
          limit: paginationLimit,
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev ;
        const prevPosts = prev?.fetchUserPosts?.posts;
        const fetchedPosts = fetchMoreResult?.fetchUserPosts?.posts;
        return {
          fetchUserPosts: {
            count: fetchMoreResult.fetchUserPosts.count,
            posts: (Array.isArray(prevPosts) && Array.isArray(fetchedPosts)) 
              ? [ ...prevPosts , ...fetchedPosts] : prevPosts,
          }
        };
      },
    });
    dispatch({type: ActionTypes.SET_MY_POST_PAGE, myPostPage: myPostPage+1});
  }

  const refetchPosts = (limit?: number) => {
    refetch({
      paginateInput: {
        page: 1,
        limit: (myPostPage - 1) * paginationLimit,
      }
    });
  }

  return (
    <ShowPosts 
      posts = {data?.fetchUserPosts?.posts!}
      totalPosts = { !!data?.fetchUserPosts?.count ? data.fetchUserPosts.count : 0 }
      loading = {loading}
      error = {error}
      isMyPosts = {true}
      loadMoreBlogs = {loadMoreBlogs}
      refetchPosts = { refetchPosts }
    />
  )
}

export default FetchMyPosts