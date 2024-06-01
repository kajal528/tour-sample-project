import { ReactNode, useEffect } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props:{children: ReactNode}) => {
  const {isAuthenticated} = useAuthContext();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuthenticated) navigate('/')
  },[isAuthenticated])
 
  return isAuthenticated ? props.children : null;
  
}

export default ProtectedRoute