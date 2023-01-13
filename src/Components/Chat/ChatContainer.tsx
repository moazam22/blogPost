import WithNavbar from "../WithNavbar/WithNavbar";
import Chat from "./Chat";


const ChatContainer = () => {
  return (
    <WithNavbar heading={'Chat'}>
      <Chat />
    </WithNavbar>
  )
}

export default ChatContainer;