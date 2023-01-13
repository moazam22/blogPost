import { ReactElement } from "react";
import Header from "../Header/Header";
import { MainContainer } from "../Styled/MainContainer.Styled";
import { Flex } from "@chakra-ui/react";
import Chat from "../Chat/Chat";

interface Props{
  children: ReactElement;
  heading: string;
}


const WithNavbar: React.FC<Props> = ({children, heading}) => {
  return(
    <MainContainer>
      <Header headingText={heading}/>
      {/* <Flex > */}
        {children}
        {/* <Chat /> */}
      {/* </Flex> */}
    </MainContainer>
  );
};

export default WithNavbar;