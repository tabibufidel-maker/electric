import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cartpayment = () => {
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const { cart: passedCart, totalAmount } = location.state || {}
  const img_url = "http://fideltruham.alwaysdata.net/static/images/"

  const [cart, setCart] = useState(() => {
    if (Array.isArray(passedCart)) return passedCart
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [cart, navigate])

  const amount = totalAmount ?? cart.reduce((sum, item) => sum + parseFloat(item.product_cost || 0), 0)

  const submit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process.......")
    setError("")

    const data = new FormData()
    data.append("phone", phone)
    data.append("amount", amount.toFixed(2))

    try {
      await axios.post("http://fideltruham.alwaysdata.net/api/mpesa_payment", data)
      setMessage("Please complete payment on your phone.")
      localStorage.removeItem('cart')
      setCart([])
    } catch (err) {
      setError(err.message)
      setMessage("")
    }
  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-7'>
          <div className='card shadow-sm border-0 p-4'>
            <h2 className='text-success fw-bold mb-3 text-center'>Pay for Cart Items</h2>
            {cart.length > 0 ? (
              <>
                <div className='mb-4'>
                  {cart.map((item) => (
                    <div key={item.id} className='d-flex align-items-center justify-content-between py-3 border-bottom'>
                      <div>
                        <strong>{item.product_name}</strong>
                        <div className='text-muted small'>{item.product_description}</div>
                      </div>
                      <span className='fw-bold'>KES {parseFloat(item.product_cost).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <div>
                    <span className='text-muted'>Total amount</span>
                    <h4 className='mb-0'>KES {amount.toFixed(2)}</h4>
                  </div>
                </div>
                {error && <div className='alert alert-danger'>{error}</div>}
                {message && <div className='alert alert-success'>{message}</div>}
                <form onSubmit={submit}>
                  <input
                    type='tel'
                    placeholder='Enter M-Pesa Number (254...)'
                    className='form-control form-control-lg mb-3 text-center border-success'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <button type='submit' className='btn btn-success w-100'>Pay Now</button>
                </form>
              </>
            ) : (
              <div className='text-center py-5'>
                <p className='mb-3'>Your cart is empty.</p>
                <button className='btn btn-primary' onClick={() => navigate('/cart')}>Back to Cart</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cartpayment
