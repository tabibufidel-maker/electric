import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const img_url = "http://fideltruham.alwaysdata.net/static/images/"

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.product_cost), 0)
  }

  const handleCheckout = () => {
    navigate('/cartpayment', { state: { cart, totalAmount: getTotalPrice() } })
  }

  return (
    <div className='container mt-4'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className='row'>
            {cart.map((item, index) => (
              <div className='col-md-4 mb-4' key={item.id ?? index}>
                <div className='card h-100 shadow border-0 bg-primary text-white'>
                  <img src={img_url + item.product_photo} className='card-img-top' width="100%" height="320px" alt={item.product_name} />
                  <div className='card-body d-flex flex-column text-center'>
                    <h5 className='fw-bold mb-1'>{item.product_name}</h5>
                    <p className='small opacity-75'>{item.product_description}</p>
                    <div className='mt-auto'>
                      <h4 className='fw-bold text-warning'>Ksh{item.product_cost}</h4>
                      <button
                        className='btn btn-danger w-100 fw-bold shadow-sm'
                        onClick={() => removeFromCart(index)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4'>
            <h4>Total: Ksh{getTotalPrice().toFixed(2)}</h4>
            <button
              className='btn btn-success me-2'
              onClick={handleCheckout}
            >
              Pay Now
            </button>
            <button
              className='btn btn-secondary'
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart