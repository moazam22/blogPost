import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../Pages/Login/LoginPage';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalProvider';
import BlogsPage from '../../Pages/Blogs/Blogs';
import SignUpPage from '../../Pages/SignUp/SignUpPage';
import NewPostPage from '../../Pages/NewPost/NewPostPage';
import MyPosts from '../../Pages/MyPosts/MyPosts';
import EditPost from '../../Pages/MyPosts/EditPost';
import { useGetCurrentUserLazyQuery, GetCurrentUserQuery, } from '../../generated/graphql';
import { useToast } from '@chakra-ui/react';
import { ActionTypes } from '../../Context/AppReducer';
import ForgetPassword from '../../Pages/ForgetPassword/ForgetPassword';
import Profile from '../../Pages/Profile/Profile';
import ChatPage from '../../Pages/Chat/ChatPage';
import { makeSocketConnection, gteOnlineUsers, updateMessageList } from '../../utils/ReuseableFuctions';

const Views = () => {
  const {user, socket, messages, notifications, dispatch} = useContext(GlobalContext);
  const [getUser] = 
    useGetCurrentUserLazyQuery({
      onCompleted: (data: GetCurrentUserQuery)=>onGettingUser(data),
      onError: ()=>showErrorToaster(),
      fetchPolicy: 'network-only',
  },);
  const toast = useToast();

  useEffect(()=>{
    if(!!user && !user?.id){
      getUser();
    }
    if(!!user?.access_token && !socket){
      let socket = makeSocketConnection(user.access_token);
      if(!!socket)
        gteOnlineUsers(socket, dispatch);
        dispatch({type: ActionTypes.SET_SOCKET, socket: !!socket ? socket : null});
    }
  },[user, socket, dispatch, getUser,]);

  useEffect(() => {
    if(!!socket)
      socket?.on("private", (newMessage) => {
        const isNotificationExists = notifications.filter(_notification => _notification === newMessage.senderId);
        if(!isNotificationExists?.length) // if notification of a sender is already exists no need to add it again!
          dispatch({type: ActionTypes.SET_NOTIFICATIONS, notifications: [...notifications, newMessage.senderId]})
        const newMessageReceived = {...newMessage, receiverId: !!user?.id ? user.id : null}
        updateMessageList(newMessageReceived, dispatch, messages);
      });
    return () => {
      if(!!socket)
        socket?.off('private');
    }
  },[socket, messages, user, notifications, dispatch]);

  const onGettingUser = (userData: GetCurrentUserQuery) => {
    const _user = {...userData?.getCurrentUser, access_token: user?.access_token};
    dispatch({type: ActionTypes.SET_USER, user: {..._user}});
  }

  const showErrorToaster = () => {
    return (
      toast({
        title: `Couldn't get user`,
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    );
  }

  return (
    <Routes>
      {
        !!user ? (
          <>
            <Route path="/" element={<BlogsPage />}/>
            <Route path="/blogs" element={<BlogsPage />}/>
            <Route path="/new-post" element={<NewPostPage />}/>
            <Route path="/my-posts" element={<MyPosts/>}/>
            <Route path="/edit-post/:id" element={<EditPost/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/chat" element={<ChatPage/>}/>            
            <Route path="*" element={<Navigate to="/blogs" />}/> 
          </>
        ): (
          <>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/log-in" element={<LoginPage />}/>
            <Route path="/sign-up" element={<SignUpPage />}/>
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
          </>
        )
      }    
    </Routes>
  )
}

export default Views;