import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './projects.css';

export default function Projects() {
  const [adminOn, setAdminOn] = useState(true);

  const img1 = require('../../assets/House1.png');
  const img2 = require('../../assets/House2.png');

  const properties = [
    {
      id: 1,
      desc: 'hiiiiiiiiii',
      imageUrl: img1,
      webUrl: ''
    },
    {
      id: 2,
      desc: 'HEY HEY HEY HEY',
      imageUrl: img2,
      webUrl: ''
    },
    {
      id: 3,
      desc: 'whoa',
      imageUrl: img1,
      webUrl: ''
    },
    {
      id: 4,
      desc: 'WHOA THERE',
      imageUrl: img2,
      webUrl: ''
    },
    {
      id: 5,
      desc: 'hi again',
      imageUrl: img1,
      webUrl: ''
    },
    {
      id: 6,
      desc: 'ugh',
      imageUrl: img2,
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
    <Container className='projects'>
      {
        adminOn ? (
          <div>
            <p className='section-title'>Projects <AddIcon /></p>
            <hr className='hrLength' />
            <div className='col-lg-12 mb-5'>
              <div className='innerCarAdmin'>
                {
                  properties.map((property) => (
                    <div key={property.id} className='carItemAdmin col-4'>
                      <div className='carCard card'>
                        <a href={property.webUrl} className='carImgContainer'>
                          <img src={property.imageUrl} className='d-block w-100 carImg' alt={property.desc} />
                        </a>
                        <div className='carBodyAdmin'>
                          <Row>
                            <p className='card-text carText'>{property.desc}</p>
                          </Row>
                          <div className='lightIcons'>
                            <Row>
                            <Col className='col-1'>
                              <EditOutlinedIcon />
                            </Col>
                            <Col className='col-1'>
                              <DeleteOutlineOutlinedIcon/>
                            </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>

        ) : (
          <div>
            <p className='section-title'>Projects</p>
            <hr className='hrLength' />
            <div id="carouselExampleControls" className='carCarousel slide mb-5' data-bs-ride="carousel">
              <div className='innerCar'>
                <div className='carets'>
                  <button className='carControlPrev' type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={scrollPrev}>
                    <CaretPrev className='carControlPrev' />
                  </button>
                  <button className='carControlNext' type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={scrollNext}>
                    <CaretNext />
                  </button>

                </div>
                {
                  properties.map((property) => (
                    <div key={property.id} className='carItem' style={{ transform: `translate(-${currentIndex * 100}%)` }}>
                      <div className='carCard card'>
                        <a href={property.webUrl} className='carImgContainer'>
                          <img src={property.imageUrl} className='d-block w-100 carImg' alt={property.desc} />
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

    </Container>
  )
}
