import { ReactNode, createContext, useContext, useReducer } from "react";
import { InitialState, authReducer } from "../reducer/AuthReducer";
import { AuthContextProps } from "../types/types";

const initialContextState = {
   user: InitialState.user,
   isAuthenticated: InitialState.isAuthenticated,
   login:(_email: string, _password: string)=>{},
   logout:()=>{}

}
const AuthContext = createContext<AuthContextProps>(initialContextState);
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}
export const AuthProvider = (props: { children: ReactNode }) => {
    const [{user, isAuthenticated}, dispatch] = useReducer(authReducer, InitialState);

    const FAKE_USER = {
        name: "Jack",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
      };
    

    function login(email: string, password: string){
        if(email===FAKE_USER.email && password===FAKE_USER.password){
            dispatch({
              type:'login',
              payload: {
                email: email,
                password: password,
                avatar: FAKE_USER.avatar,
                name: FAKE_USER.name
              }
            })
          }
    }
    function logout(){
       dispatch({
        type: 'logout',
        payload: {
            email: "",
            password: "",
            avatar: "",
            name: ""
          }
       })
    }
    return (
        <AuthContext.Provider value={{
           user,
           isAuthenticated,
           login,
           logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}