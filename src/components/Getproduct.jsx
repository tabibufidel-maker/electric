import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gamingchair from '../images/gamingchair.jpeg'
import COD from '../images/COD.jpeg'
import headset from '../images/headset.jpeg'

const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState([])
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 6
  const img_url = "http://fideltruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  const getproducts = async () => {
    setLoading(<center>please wait we are retrieving the products</center>)
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

  const addToCart = (product) => {
    const updatedCart = [...cart, product]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    alert(`${product.product_name} added to cart`)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return true
    return (
      product.product_name.toLowerCase().includes(query) ||
      product.product_description.toLowerCase().includes(query)
    )
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className='row mt-4'>
      <div>
        <div>
          <div id="carouselExample" className="carousel slide rounded-4 overflow-hidden">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={COD} className="d-block w-100 carousel-image shadow-sm" alt="Featured product" />
              </div>
              <div className="carousel-item">
                <img src={gamingchair} className="d-block w-100 carousel-image shadow-sm" alt="Gaming chair" />
              </div>
              <div className="carousel-item">
                <img src={headset} className="d-block w-100 carousel-image shadow-sm" alt="Headset" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <h2 style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '1rem' }}>
        Products on Offer
      </h2>
      <div className='col-12 mb-3 d-flex justify-content-center'>
        <div className='input-group' style={{ maxWidth: '600px' }}>
          <span className='input-group-text bg-primary text-white border-0'>
            <i className='bi bi-search'></i>
          </span>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            className='form-control border-0 shadow-sm'
            placeholder='Search products by name or description'
            style={{ fontSize: '1.1rem', padding: '12px 20px' }}
          />
        </div>
      </div>
      {loading}
      {error}

      {paginatedProducts.length === 0 && !loading && (
        <div className='col-12'>
          <p className='text-center'>No products found for "{searchTerm}".</p>
        </div>
      )}

      {paginatedProducts.map((product) => (
        <div className='col-md-4 mb-4' key={product.id}>
          <div className='card product-card h-100 shadow border-0 bg-primary text-white'>
            <img src={img_url + product.product_photo} className='card-img-top ' width="100%" height="320px" alt={product.product_name} />
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
              <button
                className='btn btn-primary w-100 fw-bold shadow-sm mt-2'
                onClick={() => addToCart(product)}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className='d-flex justify-content-center align-items-center gap-2 mt-4'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className='btn btn-outline-secondary'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Getproduct