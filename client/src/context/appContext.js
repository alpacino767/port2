import React , {  useReducer, useContext} from "react";
import reducer from "./reducer";
import axios from "axios"
import { CLEAR_ALERT, DISPLAY_ALERT ,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR, LOGOUT_USER, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_BEGIN, RESET_PASSWORD_BEGIN,RESET_PASSWORD_ERROR} from "./actions"
import toast from "react-hot-toast"


const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user? JSON.parse(user):null,
    token: token,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // axios
    const authFetch = axios.create({
        baseURL: "api/v1",
    })

    authFetch.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error)
    }
    )

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const passwordAlert = () => {
        dispatch({type: FORGOT_PASSWORD_ERROR})
        clearAlert()
    }
    const resetAlert = () => {
        dispatch({type:  RESET_PASSWORD_ERROR})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT})
        },3000);
    }





    const addUserToLocalStorage = ({user, token, }) => {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const registerUser = async (currentUser) => {
      dispatch({ type: REGISTER_USER_BEGIN })
      try {
        const response = await axios.post('/api/v1/auth/register', currentUser)
        // (response);
        const { user, token } = response.data
        dispatch ({
            type: REGISTER_USER_SUCCESS,
            payload: { user, token},
        })
        addUserToLocalStorage({user, token})
      } catch (error) {
        // (error.response);
        dispatch({
            type: REGISTER_USER_ERROR,
            payload: { msg: error.response.data.msg}
        })
      }
      clearAlert()
    
    }
    const signupGoogle = async (accessToken) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
          const response = await axios.post('/api/v1/auth/register', {googleAccesstoken: accessToken})
          // (response);
          const { user, token } = response.data
          dispatch ({
              type: REGISTER_USER_SUCCESS,
              payload: { user, token},
          })
          addUserToLocalStorage({user, token})
        } catch (error) {
          // (error.response);
          dispatch({
              type: REGISTER_USER_ERROR,
              payload: { msg: error.response.data.msg}
          })
        }
        clearAlert()
      
      }

     const loginUser = async (currentUser ) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
          const { data  } = await axios.post('/api/v1/auth/login', currentUser)
          const { user, token } = data
       
          dispatch ({
              type: LOGIN_USER_SUCCESS,
              payload: { user, token},
          })
          addUserToLocalStorage({user, token})
        } catch (error) {
            console.log(error);

          dispatch({
              type: LOGIN_USER_ERROR,
              payload: { msg: error.response.data.msg}
          })
        }
        clearAlert()
      
     }


     const signingoogle = async (accessToken) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
          const { data  } = await axios.post('/api/v1/auth/login', {googleAccesstoke: accessToken})
          const { user, token } = data
       
          dispatch ({
              type: LOGIN_USER_SUCCESS,
              payload: { user, token},
          })
          addUserToLocalStorage({user, token})
        } catch (error) {
            console.log(error);

          dispatch({
              type: LOGIN_USER_ERROR,
              payload: { msg: error.response.data.msg}
          })
        }
        clearAlert()
      
     }


const logoutUser = async () => {
    // await authFetch.get("/auth/logout")
    dispatch({ type: LOGOUT_USER})
    removeUserFromLocalStorage()
}

const forgotpassword = async (forgotEmail) => {

   
    dispatch({ type: FORGOT_PASSWORD_BEGIN })
    try {
        const response = await  axios.post('/api/v1/auth/forgotpassword', forgotEmail)
        toast.success(response.data)
        
    } catch (error) {
        toast.error(error.response.data)
  
    }
}

const resetPassword = async (details) => {
   
    dispatch({ type: RESET_PASSWORD_BEGIN })
    try {
        const response = await  axios.post('/api/v1/auth/updatepassword', details)
        const { status } = response.data
        console.log(status);
        
    } catch (error) {
    
        dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: { msg: error.response.data.msg}
        })
    }
}


    return (
        <AppContext.Provider value={{ ...state , displayAlert, registerUser, loginUser,logoutUser, passwordAlert, forgotpassword, resetPassword,resetAlert,signingoogle,signupGoogle }}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider,initialState,useAppContext}