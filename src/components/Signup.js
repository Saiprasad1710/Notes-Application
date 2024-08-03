import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

const Signup = (props) => {

  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

  const host = "http://localhost:5000";

  const handleSubmit = async (e) =>{
    e.preventDefault();
    //API call
    const {name,email,password} = credentials;

    const url=`${host}/api/auth/createuser`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
      //save the token and redirect
      if(json.success){

      localStorage.setItem('token',json.authtoken);
      navigate("/");
      }

    }

    const onChange = (e) =>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  
  }



  return (
    <div>
      <form className="container my-4" onSubmit={handleSubmit}>

         <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={credentials.name} className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} className="form-control" onChange={onChange} id="password" name="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" value={credentials.cpassword} className="form-control" onChange={onChange} id="cpassword" name="cpassword"minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )


}

export default Signup
