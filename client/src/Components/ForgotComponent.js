import React from 'react'
import { useAppContext } from "../context/appContext";
import { useState} from "react";
import Alert from './Alert';
import toast, { Toaster } from "react-hot-toast"





const initialState = {
   
    email: "",
 

}

function ForgotComponent  ()  {



const [values, setValues] = useState(initialState)
const {  showAlert,forgotpassword } = useAppContext()



const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
   }

   const onSubmit = (e) => {
    e.preventDefault()
    const { email } = values  

    if (!email) {
        toast.error("Please provide your email address")

   return
    }
    else {
    
      const forgotEmail = { email }
      forgotpassword(forgotEmail)
    }

   
}


  return (
    <div>
  
  <Toaster />

    <form
     onSubmit={onSubmit}>

    <div className="App-4">
       <div className="wrapper">
           <section className="left">
          <h1>Forgot Password</h1>
         
          {showAlert && <Alert />}
         
     
            
                   <h5 className="down">E-mail</h5>
                 
                       <label>
                           <input value={values.email} onChange={handleChange} className="in" type="email" name="email" placeholder="john@example.com" />
                       </label>

                   
            

               <div 
            //    className="account" 
               >

               <button type="submit"  
                onClick={onSubmit} style={{ cursor:"pointer", marginTop: "1rem"}} className="btn-5">submit</button> 
                
               
               </div> 
               
           </section>
         



       </div>


   </div>

   


  </form>
  
    </div>
    
  

)

  
}

export default ForgotComponent