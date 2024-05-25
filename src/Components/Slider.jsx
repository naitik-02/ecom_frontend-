import React from 'react'
 import { Carousel } from 'react-bootstrap'
const Slider = () => {
  return (
    <Carousel  >
        <Carousel.Item >
            <img src="/img1.jpg" alt="img1"  className='d-block w-100 h-10'/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="/img2.jpg" alt="img2" className='d-block w-100 h-20'/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="/img3.jpg" alt="img3" className='d-block w-100 h-20' />
        </Carousel.Item>
    </Carousel>
  )
}

export default Slider