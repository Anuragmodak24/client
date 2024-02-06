import React, { useState } from "react";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const Login = () => {

const [loginD,setLoginD] = useState({
    email:"",
    password:""
})
const [success,setSuccess] = useState("")
const [error,setError] = useState("")
const [token,setToken] = useState(localStorage.getItem("auth-token-b1") || "")

const decoded = token ? jwtDecode(token) : null;


const handlInput = (e)=>{
    const {name , value } = e.target;
    setLoginD({...loginD,[name]:value});
}
const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const res = await axios.post("http://127.0.0.1:8009/v1/login",loginD)
        setSuccess(res.data.message)
        localStorage.setItem("auth-token-b1", res.data.token)
        setToken(res.data.token)
    } catch (error) {
        setError(error.response.data)
    }
    }
const handleLogout =()=>{
    localStorage.removeItem("auth-token-b1")
    window.location.reload()
}
    return (
      <div>
        {!decoded ? <div>

        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input onChange={handlInput} name="email" value={loginD.email} type="email" />
            <input onChange={handlInput} name="password" value={loginD.password} type="password" />
            <input type="submit" />
        </form>
        {success ? <p>{success}</p> : <p>{error}</p> }
        </div> :
        <div>
        {decoded && decoded.name}
        <button onClick={handleLogout}>LOGOUT</button>

        </div>}

      </div>
    );
  }
  export default Login