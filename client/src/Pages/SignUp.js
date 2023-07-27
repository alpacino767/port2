import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import { useAppContext } from "../context/appContext";





const initialState = {
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: '',
    // isMember: false,


}


function SignUp() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const { user, showAlert, isLoading, displayAlert, registerUser, loginUser, signupGoogle } = useAppContext()

    // const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    // const handleChange = (e) => setsForm({
    //     ...sForm,
    //     [e.target.name]: e.target.value
    // });

    function handleGoogleLoginSuccess(tokenResponse) {
     console.log("token res",tokenResponse);
        const accessToken = tokenResponse;
        signupGoogle(accessToken)
    
    }
   
    const handleLogin = console.log("handleLogin");

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {

        }
    }

    // const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    const [sForm,
        setsForm] = useState(initialState)
    const eye = <FontAwesomeIcon icon={faEye} />;


    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(!show)
    }



    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember) {
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }

    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/dashboard')
            }, 3000)
        }
    }, [user, navigate])


    
    return (

        <form onSubmit={onSubmit}>
            <div className="App-5">
                <div className="wrapper">
                    <section className="left">

                        <div className='navigation-1'>
                            <p className='fib-1'>Fiber</p>
                        </div>

                        <div className="head-4"><h2>
                            Create your Fiber Account
                        </h2>
                        </div>
                        {showAlert && <Alert />}

                        <div
                        value={values.name} onChange={handleChange} className="search-3">
                            <h4 className="down">Your name</h4>

                            <label>
                                <input className="in2"
                                value={values.name} onChange={handleChange} 
                                    type="text" name="name"
                                    placeholder="John Doe"
                                />
                            </label>



                        </div>
                        <div type='email' name="email" value={values.email} onChange={handleChange} className="search-3">
                            <h4 className="down">E-mail</h4>

                            <label>
                                <input className="in2" type="text" name="email" placeholder="john@example.com" />
                            </label>



                        </div>
                        <div className="search-3">
                            <h4 className="down">Password</h4>
                            <div type="password" name="password" value={values.password} onChange={handleChange}>
                                <label>
                                    <input className="in2" type={show ? "text" : "password"} name="password" placeholder="At least 8 characters" />
                                    <i onClick={handleShow} className="eye1">{eye}</i>

                                </label>

                            </div>

                        </div>

                                              <div className="account">

                            {/* <Link to="/Dashboard"> */}
                            <button type="submit" disabled={isLoading} onSubmit={onSubmit} style={{ cursor: "pointer" }} className="btn-6">Create Fiber Account</button>
                            {/* </Link> */}
                        </div>
                        <div className="beneath">
                            <Link to="/SignIn"  ><p className="ready">Already have an account?<span className="sign" style={{ cursor: "pointer" }}>Sign in</span></p> </Link>
                        </div>
                        <div  style={{ marginTop:"-9rem", display:"flex", justifyContent:"center", alignItems:"center"}}>
               <div>
               <GoogleOAuthProvider clientId="908507029918-1o9up7orqurl9jk2glmc4io7qdn7nkog.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                // onClick={useGoogleLogin({onSuccess: handleGoogleLoginSuccess})}
            />
        </GoogleOAuthProvider>
               </div>
            </div>
                    </section>
                    <section className="right">


                        <div
                            className="img-4"
                        >
                            <img className="pic-2" src="Assets/Image2.png" alt=""></img>
                        </div>
                        <div className="last-man">
                            <h2 className="last-last">Unparalleled Templates</h2>
                            <p className="la-2">Crafted by a team of professional designers, our templates are eunparalleled in the market</p>

                        </div>
                    </section>

                </div>
                <div className="divide">



                </div>


            </div>
    
        </form>
    )
}





export default SignUp
