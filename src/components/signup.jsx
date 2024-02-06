import React, { useState } from "react";
import axios from "axios";

const Signup = () => {

const [SignupD,setSignupD] = useState({
    name:"",
    email:"",
    password:""
});
const [success,setSuccess] = useState("")
const [error,setError] = useState("")

const handlInput = (e)=>{
    const {name , value } = e.target;
    setSignupD({...SignupD,[name]:value});
}
const handleSignup = async(e) => {
  
    e.preventDefault()
    try {
        const res = await axios.post("http://127.0.0.1:8009/v1/signup",SignupD)
        if(res.status === 201){
            setSuccess(res.data)
        }
    } catch (error) {
        console.log(error.response.data)
        setError(error.response.data)
    }
}


    return (
      <div>
        <form onSubmit={handleSignup}>
           <h3>Signup</h3>
            <input onChange={handlInput} name="name" value={SignupD.name} type="text" />
            <input onChange={handlInput} name="email" value={SignupD.email} type="email" />
            <input onChange={handlInput} name="password" value={SignupD.password} type="password" />
            <input type="submit" />
        </form>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </div>
    );
  }
  export default Signup