import React from 'react'
import { useAppContext } from "../context/appContext";





// const initialState = {
//   name: "",
//   email: "",
//   password: "",
//   // isMember: false,


// }

const Dashboard = () => {
  // const [values, setValues] = useState(initialState)
  const { logoutUser } = useAppContext()

  
  return (
  <div>
    <h1>Coming soon</h1>

    <button onClick={logoutUser} className='btn-2'><p className='f2'>Log out</p></button>
  </div>



  )
}

export default Dashboard