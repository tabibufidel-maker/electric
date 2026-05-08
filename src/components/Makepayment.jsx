import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const Makepayment = () => {
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { product } = useLocation().state || {}
  const img_url = "http://fideltruham.alwaysdata.net/static/images/"

  // function to make payment
  const submit = async (e) => {
    // preventing form default loading behavior
    e.preventDefault()
    // setloading message
    setMessage("Please wait as we process.......")
    // attaching user inputs to the data variables
    const data = new FormData()
    data.append("phone", phone)
    data.append("amount", product.product_cost)
    // connection to the backend
    try {
      const response = await axios.post("http://fideltruham.alwaysdata.net/api/mpesa_payment", data)
      setMessage("Please complete payment on your phone")
    } catch (error) {
      setError(error.message)
    }


  }
  return (
    <div className='container py-5'>
      <div className="row justify-content-center">
        <div className="col-md-5 card shadow-sm border-0 p-4 text-center" style={{ borderRadius: '15px' }}>
          <h2 className="text-success fw-bold mb-3">Lipa na M-Pesa</h2>
          <div className="d-flex justify-content-center mb-3">
            <img src={img_url + product.product_photo} alt={product?.product_name || 'Product'} className="payment-image shadow-sm" />
          </div>
          <p className="mb-1 fw-bold">{product.product_name}</p>
          <h4 className="text-success mb-4">KES {product.product_cost}</h4>

          <form onSubmit={submit}>
            {error}
            {message}
            <input
              type="tel"
              placeholder='Enter M-Pesa Number (254...)'
              className='form-control form-control-lg mb-3 text-center border-success'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type='submit' className='btn btn-success'>Make payment</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Makepayment