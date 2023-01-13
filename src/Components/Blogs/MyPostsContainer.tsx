import FetchMyPosts from "./FetchMyPosts"
import WithNavbar from "../WithNavbar/WithNavbar";

const MyPostsContainer = () => {
  return (
    <WithNavbar heading="My Blogs">
      <FetchMyPosts />
    </WithNavbar>
  )
}

export default MyPostsContainer;