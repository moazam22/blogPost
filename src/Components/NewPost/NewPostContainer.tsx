import NewPost from "./NewPost";
import { MainContainer, FormContainer } from "../Login/Login.styled";

const NewPostContainer = () => {
  return (
    <MainContainer>
      <FormContainer>
        <NewPost />
      </FormContainer>
    </MainContainer>
  )
}

export default NewPostContainer