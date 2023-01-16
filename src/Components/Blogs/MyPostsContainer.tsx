import { useContext } from "react";
import { ActionTypes } from "../../Context/AppReducer";
import { GlobalContext } from "../../Context/GlobalProvider";
import { useFetchUserPostsQuery } from "../../generated/graphql";
import { paginationLimit } from "../../utils";
import WithNavbar from "../WithNavbar/WithNavbar";
import Blogs from "./Blogs";


const MyPostsContainer = () => {
  const { myPostPage, dispatch } = useContext(GlobalContext);
  
  const { data, loading, error, fetchMore, refetch } = useFetchUserPostsQuery({
    variables: {
      paginateInput: {
        page: 1,
        limit: paginationLimit,
      }   
    }
  });

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

  const posts = data?.fetchUserPosts?.posts!;
  const totalPosts = !!data?.fetchUserPosts?.count ? data.fetchUserPosts.count : 0 ;

  
  return (
    <WithNavbar heading="My Blogs">
      <Blogs
        userPostsData={data}
        posts={posts}
        totalPosts={totalPosts}
        loading={loading}
        error={error}
        page={myPostPage}
        loadMoreBlogs={loadMoreBlogs}
        refetch={refetch}
        isMyPosts={true}
      />
    </WithNavbar>
  )
}

export default MyPostsContainer;