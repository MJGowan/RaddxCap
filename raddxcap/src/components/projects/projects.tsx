import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';
import './projects.css';
import { getPublishedItems } from '../../Services/DataService';

export default function Projects() {

  const [items, setItems] = useState<{ id: number, description: string, image: string, listingLink: string, isPublished: boolean, isDeleted: boolean }[]>([]);

  const PublishedItems = async () => {
    let publishedItems = await getPublishedItems();
    setItems(publishedItems);
  }

  useEffect(() => {
    PublishedItems();
  })

  // -------------------------------------

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = items.length;

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

  // -------------------------------------

  const ReplacementOne = () => {
    return (
      <div className='replacement-card card'>
        <p className='rp-card-text carText'>No more project listings at the moment. Check back soon!</p>
      </div>
    )
  }

  const ReplacementTwo = () => {
    return (
      <div className='replacement-card-two card'>
        <p className='rp-card-text carText'>No project listings at the moment. Check back soon!</p>
      </div>
    )
  }

  // -------------------------------------

  return (
    <Container id='projects'>
      <div>
        <p className='section-title'>Projects</p>
        <hr className='hrLength' />
        {
          items.length > 0 ? (
            <div id="carouselExampleControls" className='carCarousel slide' data-bs-ride="carousel">
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
                  items.map((item, index) => (
                    <div key={index} className='carItem' style={{ transform: `translate(-${currentIndex * 100}%)` }}>
                      {item.isPublished ? (

                        <div className='carCard card'>
                          <a href={item.listingLink} className='carImgContainer'>
                            <img src={item.image} className='d-block w-100 carImg' alt={item.description} />
                          </a>
                          <div className='carBody'>
                            <p className='card-text carText'>{item.description}</p>
                          </div>
                        </div>
                      ) : null
                      }
                    </div>
                  ))
                }
                {
                  items.length == 1 ? (
                    <>
                      <ReplacementOne />
                      <ReplacementOne />
                    </>
                  ) : items.length == 2 ? (
                    <>
                      <ReplacementOne />
                    </>
                  ) : null
                }
              </div>
            </div>
          ) : (
            <>
              <ReplacementTwo />
            </>
          )
        }
      </div>

    </Container >
  )
}
