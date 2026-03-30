import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Signup = () => {
    // adding state to all user inputs
    const[Username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] =useState("")
    const[phone, setPhone] = useState("")
    // states for success error and loading messages
    const[loading, setLoading] = useState("")
    const[success, setSuccess] = useState("")
    const[error, setError] = useState("")
    

    //functions to post user inputs in the database 
    const submit = async (e) => {
        // prevents the page from reloading before the data is saved in the database
        e.preventDefault()
        setLoading("please wait as we upload ur data!")
        // sending user inputs to the database
        try {
            const data = new FormData()
            // appending data to the FormData variable
            data.append("username",Username)
            data.append("email", email)
            data.append("password", password)
            data.append("phone", phone)

            // using axios to post our data to the database
            const response = await axios.post ("http://fideltruham.alwaysdata.net/api/signup" , data)
            // removing the loading message by setting it to empty
            setLoading("")
            // adding success message after successful data posting to the database
            setSuccess(response.data.message)

            // clearing the form fields making the work the work easier for the user
            setUsername("")
            setEmail("")
            setPassword("")
            setPhone("")
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }


    return (
      <div className='row mt-5 justify-content-center'>
  <div className='col-md-5 card shadow border-0 bg-light p-4 rounded-4'>
    {/* Colorful Title */}
    <h2 className='text-success fw-bold text-center mb-4'>Create Account</h2>
    
    <form onSubmit={submit}>
      {loading || success || error}

      <div className="mb-3">
        <input type="text" placeholder="Username" className="form-control border-0 shadow-sm" 
          value={Username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div className="mb-3">
        <input type="email" placeholder="Email" className="form-control border-0 shadow-sm" 
          value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mb-3">
        <input type="password" placeholder="Password" className="form-control border-0 shadow-sm" 
          value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="mb-4">
        <input type="tel" placeholder="Phone" className="form-control border-0 shadow-sm" 
          value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <button className="btn btn-success w-100 fw-bold shadow-sm py-2" type="submit">
        Sign Up
      </button>

      <p className='text-center mt-3 mb-0 small'>
        Already a member? <Link to="/signin" className='text-success fw-bold text-decoration-none'>Sign In</Link>
      </p>
    </form>
  </div>
</div>
    )
}
export default Signup