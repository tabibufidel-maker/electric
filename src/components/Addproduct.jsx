import React, { useState } from 'react'
import axios from 'axios'

function Addproduct() {
  const [productname, setProductname] = useState('')
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [Productphoto, setProductphoto] = useState("")


  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Wait as we process!")
    try {
      const data = new FormData()

      data.append("product_name", productname)
      data.append("product_description", description)
      data.append("product_cost", cost)
      data.append("product_photo", Productphoto)

      const response = await axios.post("https://fideltruham.alwaysdata.net/api/add_product", data)

      setLoading("")
      setSuccess(response.data.Message)

      setProductname("")
      setDescription("")
      setCost("")
      setProductphoto("")

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }

  return (
   <div className='row mt-5 justify-content-center'>
  <div className='col-md-5 card shadow border-0 p-4 rounded-4'>
    <h2 className='text-primary fw-bold text-center mb-4'>Add Product</h2>
    
    <form onSubmit={submit}>
      {loading || success || error}

      <div className="mb-3">
        <label className="form-label small fw-bold">Product Name</label>
        <input type="text" className='form-control border-0 bg-light' 
          value={productname} onChange={(e) => setProductname(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label small fw-bold">Description</label>
        <textarea className='form-control border-0 bg-light' rows="2"
          value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-bold">Cost (Ksh)</label>
        <input type="number" className='form-control border-0 bg-light' 
          value={cost} onChange={(e) => setCost(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="form-label small fw-bold">Product Photo</label>
        <input type="file" accept='image/*' className='form-control border-0 bg-light' 
          onChange={(e) => setProductphoto(e.target.files[0])} required />
      </div>

      <button type='submit' className='btn btn-primary w-100 fw-bold shadow-sm py-2'>
        Save Product
      </button>
    </form>
  </div>
</div>
  )
}

export default Addproduct