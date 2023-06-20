import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';

export default function Projects() {

  const properties = [
      {
        id: 1,
        desc: 'hiiiiiiiiii',
        imageUrl: '../../assets/House 1.png',
        webUrl: ''
      },
      {
        id: 2,
        desc: 'HEY HEY HEY HEY',
        imageUrl: '../../assets/House 2.png',
        webUrl: ''
      },
      {
        id: 3,
        desc: 'whoa',
        imageUrl: '/assets/House 1.png',
        webUrl: ''
      },
      {
        id: 4,
        desc: 'WHOA THERE',
        imageUrl: '/assets/House 2.png',
        webUrl: ''
      },
      {
        id: 5,
        desc: '',
        imageUrl: '',
        webUrl: ''
      },
      {
        id: 6,
        desc: '',
        imageUrl: '',
        webUrl: ''
      }
    ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = properties.length;
  const carouselInfiniteScroll = () => {
      if (currentIndex >= length - 3) {
          return setCurrentIndex(0);
      }
      return setCurrentIndex(currentIndex + 1)
  }
  useEffect(() => {
      const interval = setInterval(() => { carouselInfiniteScroll() }, 5000);
      return () => clearInterval(interval);
  })
  const scrollPrev = () => {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex < 0 ? length - 3 : newIndex)
  }
  const scrollNext = () => {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex >= length - 2 ? 0 : newIndex)
  }

  return (
    <div>
      <div id="carouselExampleControls" className='carCarousel slide mb-5' data-bs-ride="carousel">
        <div className='innerCar'>
          <div className='carets'>
            <button className='carControlPrev' type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={scrollPrev}>
              <CaretPrev/>
            </button>
            <button className='carControlNext' type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={scrollNext}>
              <CaretNext/>
            </button>

          </div>
          {
            properties.map((property) => (
              <div key={property.id} className='carItem' style={{ transform: `translate(-${currentIndex * 100}%)` }}>
                <div className='carCard card'>
                  <a href={property.webUrl} className='carImgContainer'>
                    <img src={property.imageUrl} className='d-block w-100 carImg' />
                  </a>
                  <div className='carBody'>
                    <p className='card-text carText'>{property.desc}</p>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}
