import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

const Login = (props) => {

  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({email:"",password:""})
  
  const host = "http://localhost:5000";
  const handleSubmit = async (e) =>{
    e.preventDefault();
    //API call

    const url=`${host}/api/auth/login`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json = await response.json();
      console.log(json);
      //if success is true :we got a auth token
      if(json.success){
        //save the token and redirect
        localStorage.setItem('token',json.authtoken);
      
        navigate("/home");
      }
     



  }
  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})

}

  return (
  <div>
    <form className="container my-4" onSubmit={handleSubmit}>
      <div className=" mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" value={credentials.email} className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" value={credentials.password} className="form-control" onChange={onChange} id="password" name="password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </div>
  )
}

export default Login
