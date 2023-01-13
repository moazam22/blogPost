import Blogs from "./Blogs";
import WithNavbar from "../WithNavbar/WithNavbar";

const BlogContainer = () => {
  return (
    <WithNavbar heading="Blogs">
      <Blogs />
    </WithNavbar>
  )
}

export default BlogContainer