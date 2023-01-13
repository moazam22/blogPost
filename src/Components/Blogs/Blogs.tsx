import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalProvider";
import { useFetchAllPostsQuery, useSearchPostLazyQuery, SearchPostQueryVariables, SearchPostQuery } from "../../generated/graphql";
import { ActionTypes } from "../../Context/AppReducer";
import ShowPosts from "./ShowPosts";
import { Post } from "../../generated/graphql";
import { useToast } from "@chakra-ui/react";

const paginationLimit = 3;

const Blogs = () => {
  const [filteredData, setFilteredData] = useState<Post[] | null>(null);
  const { postPage, dispatch } = useContext(GlobalContext);
  const toast = useToast();
  
  const { data, loading, error, fetchMore, refetch } = useFetchAllPostsQuery({
    variables: {
      paginateInput: {
        page: 1,
        limit: paginationLimit,
      },
    },
  });

  const [searchPost, { loading: searchLoading }] = useSearchPostLazyQuery({
    onCompleted: (response: SearchPostQuery) => setFilteredData(response?.searchPost!),
    onError: () => toast({
      title: `Couldn't filter post.`,
      status: 'error',
      isClosable: true,
      position: 'top',
    })
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
          page: postPage,
          limit: paginationLimit,
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const prevPosts = prev?.fetchAllPosts?.posts;
        const fetchedPosts = fetchMoreResult?.fetchAllPosts?.posts;
        return {
          fetchAllPosts: {
            count: fetchMoreResult.fetchAllPosts.count,
            posts: (Array.isArray(prevPosts) && Array.isArray(fetchedPosts)) 
              ? [ ...prevPosts , ...fetchedPosts] : prevPosts,
          }
        };
      },
    });
    dispatch({type: ActionTypes.SET_PAGE, postPage: postPage+1});
  }

  const refetchPosts = (limit?: number) => {
    refetch({
      paginateInput: {
        page: 1,
        limit: !!limit ? limit :  (postPage - 1) * paginationLimit,
      }
    });
  }

  const onSearch = (_str: SearchPostQueryVariables) => {
    searchPost({
      variables: {
        queryString: _str.queryString
      },
    }) 
  }

  const resetFilter = useCallback(() => {
    setFilteredData(null);
  },[]);

  return (
    <ShowPosts 
      posts = { !!filteredData?.length ? filteredData : data?.fetchAllPosts?.posts!}
      totalPosts = { !!data?.fetchAllPosts?.count ? data.fetchAllPosts.count : 0 }
      loading = {loading}
      error = {error}
      isMyPosts = {false}
      showSearchBar = {true}
      searchLoading={searchLoading}
      loadMoreBlogs = {loadMoreBlogs}
      refetchPosts = { refetchPosts }
      onSearch={onSearch}
      resetFilter={resetFilter}
      isFilterApplied = {!!filteredData}
    />
  )
}

export default Blogs;