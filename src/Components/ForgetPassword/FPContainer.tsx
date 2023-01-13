import UserKeyForm from "./UserKeyForm"
import { useState, useCallback } from "react"
import { MainContainer, FormContainer } from "../Login/Login.styled";
import ResetPassword from "./ResetPassword";

const FPContainer = () => {
  const [userKey, setUserKey] = useState<null| string>(null);
  
  const changeUserKey = useCallback((data: null| string)=>{
    setUserKey(data);
  },[]);

  return (
    <MainContainer>
      <FormContainer>
        {
          !userKey 
          ? (
            <UserKeyForm changeUserKey={changeUserKey}/>
          )
          : <ResetPassword userKey={userKey}/>
        }
       </FormContainer>
    </MainContainer> 
  );
}

export default FPContainer