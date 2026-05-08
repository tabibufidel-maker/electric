import React from 'react'
import 'bootstrap/dist/js/bootstrap.min.js';
import "./Carousel.css"
import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'


const Carousel = () => {
  return (
    <div>
        <div className='col-md-12'>
            <div id='mycarousel' className='carousel slide' data-bs-ride="carousel">
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <img src={slide1} alt='' className='carousel-img w-100% h-300px' />
                </div>
                <div>
                  <img src={slide2} alt='' className='carousel-img w-100% h-300px' />
                </div>
                <div className='carousel-item'></div>
                <div className='carousel-item'></div>
                
            </div>
            <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev" role='button'>
            <span className='carousel-control-prev-icon bg-danger' aria-hidden="true"></span>
            <span className='visual-hidden'></span>
            </a>
            <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next" role='button'>
            <span className='carousel-control-next-icon bg-danger' aria-hidden="true"></span>
            <span className='visual-hidden'></span>
            </a>
        </div>
        </div>
    </div>
  )
}

export default Carousel