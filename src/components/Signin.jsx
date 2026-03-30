import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
  // adding the states to the inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // states for success error messages
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate ()

  // function to host data to the database
  const submit = async (e) => {
    // preveint the default behavior of form reloading
    e.preventDefault()
    // updating the loading message
    setLoading("please wait as we log you in")
    // uploading data into the database
    try {
      // adding user inputs to the variable data
      const data = new FormData()
      // appending data to the FormData variable
      data.append("email", email)
      data.append("password", password)

      // connecting to the backend
      const response = await axios.post("http://fideltruham.alwaysdata.net/api/signin", data)
      // updating loading message to empty
      setLoading("")
      // cheking if the user exists
      if (response.data.user){
        // adding the user in the browser local storage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // redirecting the user landing page
        navigate("/")
      }  
      else {
          // when the user inputs wrong email or password
          setError(error.response.data.Message)
      }  
      
    } catch (error) {
      // making loading empty
      setLoading("")
      // updating the error message
      setError(error.response.data.message)
    }
  }
  return (
   <div className='row mt-5 justify-content-center'>
  <div className='col-md-5 card shadow border-0 bg-light p-4 text-center'
   style={{ borderRadius: '15px' }}>
    <h2 className='text-primary fw-bold mb-4'>Welcome Back</h2>
    
    <form onSubmit={submit}>
      {error && <div className="alert alert-danger py-1 mb-3">{error}</div>}

      <input type="email" placeholder='Email' className='form-control mb-3 border-0 shadow-sm' 
        value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder='Password' className='form-control mb-4 border-0 shadow-sm' 
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className='btn btn-primary w-100 fw-bold shadow-sm mb-3'>
        {loading ? '...' : 'Sign In'}
      </button>

      <p className='small'>New here? <Link to="/Signup" className='text-decoration-none fw-bold'>Create Account</Link></p>
    </form>
  </div>
</div>
  )
}

export default Signin