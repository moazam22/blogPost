import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}
const WithAuth: React.FC<Props> = ({children}) => {
  const navigate = useNavigate();
  if(!localStorage.getItem('user')){
    navigate('/login');
  }
  return (
    children
  )
}

export default WithAuth;