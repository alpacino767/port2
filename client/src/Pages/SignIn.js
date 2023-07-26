
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import { useAppContext } from "../context/appContext";


const eye = <FontAwesomeIcon icon={faEye} />;


const initialState = {
    name: "",
    email: "",
    password: "",
    // isMember: false,
 

}


function SignIn()  {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const { user, showAlert, isLoading, displayAlert, registerUser, loginUser } = useAppContext()
  
const [show, setShow] = useState(false)
const handleShow = () => {
    setShow(!show)
}


const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
   }
   
   const onSubmit = (e) => {
       e.preventDefault()
       const {  email, password, isMember } = values
      if(!email || !password ) {
        displayAlert()
        return
      }
      const currentUser = { email, password } 
      if(isMember){
      registerUser(currentUser)
    } else {
        loginUser(currentUser)
      }
      
      
   }

  useEffect(() => {
    if(user) {
        setTimeout(() => {
            navigate('/dashboard')
        }, 3000)
    }
    }, [user, navigate])


    return (

       <form onSubmit={onSubmit}>
         <div className="App-4">
            <div className="wrapper">
                <section 
                // className="left"
                >

                    <div className='navigation-1'>
                    </div>
                   
                  <div className="head-4"><h2>
                        Login your Fiber Account
                    </h2>
                    </div>
                    {showAlert && <Alert />}
                  
            
                    <form type='email' name="email" value={values.email} onChange={handleChange} className="search-3">
                        <h4 className="down">E-mail</h4>
                      
                            <label>
                                <input className="in" type="text" name="email" placeholder="john@example.com" />
                            </label>

                        

                    </form>
                    <div className="search-3">
                        <h4 className="down">Password</h4>
                        <form type="password" name="password" value={values.password} onChange={handleChange}>
                            <label>
                                <input className="in" type={show?"text": "password"} name="password" placeholder="At least 6 characters" />
                                <i onClick={handleShow} className="eye">{eye}</i>

                            </label>

                        </form>

                    </div>

                    <div className="">
                        <label className="terms">
                           
                        </label>
                    </div>
                    <div className="account1">

                    <button type="submit" disabled={isLoading} onSubmit={onSubmit} style={{ cursor:"pointer"}} className="btn-5">Login Fiber Account</button> 
                 
                    </div> 
                    {/* <div style={{fontSize: "12px", paddingLeft: "19rem"}}>
                  <Link to={"/forgot"}><p>Forgot Password ?</p></Link>
                  </div> */}
                  <div className="beneath">
                            <Link to="/SignUp"  ><p className="ready">Don't have an account?<span className="sign" style={{ cursor: "pointer" }}>Sign Up</span></p> </Link>
                        </div>

                 
                    
                </section>
             

               
            </div>



        </div>


       </form>
    )
}





export default SignIn
