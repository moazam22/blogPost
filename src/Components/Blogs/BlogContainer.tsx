import { useToast } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import { Post, SearchPostQuery, SearchPostQueryVariables, useFetchAllPostsQuery, useSearchPostLazyQuery } from "../../generated/graphql";
import { paginationLimit } from "../../utils";
import WithNavbar from "../WithNavbar/WithNavbar";
import Blogs from "./Blogs";

const BlogContainer = () => {
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


  const posts = !!filteredData?.length ? filteredData : data?.fetchAllPosts?.posts!;
  const totalPosts = !!data?.fetchAllPosts?.count ? data.fetchAllPosts.count : 0;

  return (
    <WithNavbar heading="Blogs">
      <Blogs
        data = {data}
        posts = { posts }
        totalPosts = { totalPosts }
        loading = {loading}
        error = {error}
        searchLoading= {searchLoading}
        isFilterApplied = {!!filteredData}
        page={postPage}
        onSearch={onSearch}
        resetFilter={resetFilter}
        loadMoreBlogs={loadMoreBlogs}
        refetch = {refetch}
      />
    </WithNavbar>
  )
}

export default BlogContainer