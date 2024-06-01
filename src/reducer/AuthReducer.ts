
enum AUTHACTION {
   LOGIN = 'login',
   LOGOUT = 'logout'
  }
  
  // An interface for our actions
  export interface AuthAction {
    type: string,
    payload: User
  }
  export interface User {
    email: string,
    password: string,
    avatar: string,
    name: string
}
  // An interface for our state
  export interface AuthProps {
    user: User,
    isAuthenticated: boolean
  }

  export const InitialState = {
    user: {
        email: "",
        password: "",
        avatar: "",
        name: ""
    },
    isAuthenticated: false
  }

export function authReducer(state: AuthProps, action: AuthAction) {
    const { type, payload } = action;
    switch (type) {
      case AUTHACTION.LOGIN:
        return {
           ...state,
           user: payload,
          isAuthenticated: true,
        };
      case AUTHACTION.LOGOUT:
        return {
            ...state,
            isAuthenticated: false
        }
      default:
        throw new Error('Unknown login action.');
    }
  }
  
