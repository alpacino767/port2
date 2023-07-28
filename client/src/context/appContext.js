import React , {  useReducer, useContext} from "react";
import reducer from "./reducer";
import axios from "axios"
import { CLEAR_ALERT, DISPLAY_ALERT ,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR, LOGOUT_USER, FORGOT_PASSWORD_ERROR,RESET_PASSWORD_ERROR, IMAGE_LOAD_BEGIN, IMAGE_LOAD_SUCCESS, IMAGE_LOAD_ERROR, SET_IMAGE} from "./actions"
import toast from "react-hot-toast"


const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const nasaImageDetails = localStorage.getItem("imageDetails")
 const parsedNasaImageDetails = JSON.parse(nasaImageDetails)
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    nasaImageDetails: nasaImageDetails ? parsedNasaImageDetails.data : null
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
    const addImageToLocalStorage = (imageDetails) => {
        console.log("img det", imageDetails);
        localStorage.setItem("imageDetails", JSON.stringify(imageDetails))

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
          const response = await axios.post('/api/v1/auth/register', {googleAccessToken: accessToken})
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


     const signinGoogle = async (accessToken) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
          const { data  } = await axios.post('/api/v1/auth/login', {googleAccessToken: accessToken})
          console.log("signin token", accessToken);
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

const fetchNasaImage = async () => {
    console.log("fetchin image");
    dispatch({ type: IMAGE_LOAD_BEGIN })
    try {
      const response = await axios.get('/api/v1/img/nasa-image')
      console.log("response", response);
      // (response);
      dispatch ({
          type: IMAGE_LOAD_SUCCESS,
          payload: response.data
      })
      console.log("response data", response.data);
      const  data  = response.data
      const dateAdded = new Date().toISOString().slice(0, 10)
        addImageToLocalStorage({data, dateAdded})

    } catch (error) {
      // (error.response);
      dispatch({
          type: IMAGE_LOAD_ERROR,
          payload: { msg: error.response.data.msg}
      })

}
}
const setImageDetails = (imageDetails) => {
    dispatch({ type: SET_IMAGE,
               payload: imageDetails
    }) 

    clearAlert()
  
  }
  

    return (
        <AppContext.Provider value={{ ...state , displayAlert, registerUser, loginUser,logoutUser, passwordAlert, resetAlert, signinGoogle, signupGoogle, fetchNasaImage, setImageDetails}}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}