import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';

export default function projects() {

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const length = logo.boardAdvisory.length;
  // const carouselInfiniteScroll = () => {
  //     if (currentIndex >= length - 3) {
  //         return setCurrentIndex(0);
  //     }
  //     return setCurrentIndex(currentIndex + 1)
  // }
  // useEffect(() => {
  //     const interval = setInterval(() => { carouselInfiniteScroll() }, 5000);
  //     return () => clearInterval(interval);
  // })
  // const scrollPrev = () => {
  //     const newIndex = currentIndex - 1;
  //     setCurrentIndex(newIndex < 0 ? length - 3 : newIndex)
  // }
  // const scrollNext = () => {
  //     const newIndex = currentIndex + 1;
  //     setCurrentIndex(newIndex >= length - 2 ? 0 : newIndex)
  // }

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
            logo.boardAdvisory.map((member) => (
              <div key={member.id} className='carItem' style={{ transform: `translate(-${currentIndex * 100}%)` }}>
                <div className='carCard card'>
                  <a href={member.webUrl} className='carImgContainer'>
                    <img src={member.logoUrl} className='d-block w-100 carImg' alt={member.name} />
                  </a>

                  <div className='carBody'>
                    <p className='carText carTitle'>{member.name}</p>
                    <p className='card-text carText'>{member.desc}</p>
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
