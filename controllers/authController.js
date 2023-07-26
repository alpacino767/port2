import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { UnAuthenticatedError} from "../errors/index.js"
import attachCookies from "../utils/attachCookies.js"





class CustomAPIError extends Error {
    constructor(message) {
        super(message)
       
    }
} 
class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
} 
class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
} 



const register =  async (req, res) => {

    
    const { name, email, password } = req.body

    if (!name || !password || !email) {
        throw new BadRequestError ("Please provide all values")
    }

     const userAlreadyExists = await User.findOne({email})
     if (userAlreadyExists){
        throw new BadRequestError('Email is already in use')
     }
   const user = await User.create({ name, email, password })
   const token = user.createJWT()
   attachCookies({ res, token})
 
    res.status(StatusCodes.CREATED).json({ user: {
        email: user.email,
        name: user.name,
    }, 
    token },)
    
}

const login = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const user = await User.findOne({ email }).select("+password")
  if(!user){
    throw new UnAuthenticatedError("Invalid credentials")
  }
 
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new  UnAuthenticatedError("Invalid credentials")
  }
  const token = user.createJWT()

  user.password = undefined
  attachCookies({ res, token})


const oneDay = 1000 * 60 * 60 * 24
res.cookie("token", token, {
  httpOnly:true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === "production"

})
  res.status(StatusCodes.OK).json({user, token})

}


 
const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: "user logged out!"})

}


export { register, login, logout } 