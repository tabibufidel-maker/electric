import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState([])
  const img_url = "http://fideltruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  // functions to fetch products from the database
  const getproducts = async () => {
    // updating the loading message
    setLoading("please wait we are retrieving the products")
    // connecting axios to flask api to fetch data from the database
    try {
      const response = await axios.get("http://fideltruham.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)
      console.log(response)
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  useEffect(() => {
    getproducts()
  }, [])
  return (
    <div className='row'>
      <h2>Available products</h2>
      {loading}
      {error}

      {/* mapping the cards to all the products */}
      {products.map((product) => (
        <div className='col-md-4 mb-4'>
  <div className='card h-100 shadow border-0 bg-primary text-white'>
    <img src={img_url + product.product_photo} className='card-img-top' alt={product.product_name} />
    
    <div className='card-body d-flex flex-column text-center'>
      <h5 className='fw-bold mb-1'>{product.product_name}</h5>
      <p className='small opacity-75'>{product.product_description}</p>
      
      <div className='mt-auto'>
        <h4 className='fw-bold text-warning'>Ksh{product.product_cost}</h4>
        <button 
          className='btn btn-light w-100 fw-bold shadow-sm' 
          onClick={() => navigate('/makepayment', { state: { product } })}
        >
          Purchase Now
        </button>
      </div>
    </div>
  </div>
</div>
      )
      )
      }
    </div>
  )
}

export default Getproduct