import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './projects.css';
import { checkToken, addItem, getAllItems, getPublishedItems, updateItem, deleteItem } from '../../Services/DataService';

export default function Projects() {
  const [adminOn, setAdminOn] = useState(false);

  const [itemImage, setItemImage] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  useEffect(() => {
    if (checkToken()) {
      setAdminOn(true);
    };

    async function getItems() {
      const items = await getAllItems();
      setItemImage(items.image!);
      setItemDesc(items.desc!);
    }
    getItems();

  })



  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);


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

  // -------------------------------------

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
    <Container className='projects' id='projects'>
      {
        adminOn ? (
          <div>
            <p className='section-title'>Projects <AddIcon onClick={handleShowAdd} /></p>
            <hr />
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
                                <EditOutlinedIcon onClick={handleShowEdit} />
                              </Col>
                              <Col className='col-1'>
                                <DeleteOutlineOutlinedIcon onClick={handleShowDelete} />
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

            {/* Add-Project Modal */}
            <Modal
              show={showAdd}
              onHide={handleCloseAdd}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3'>
                  <Form.Label>Link to Listing</Form.Label>
                  <Form.Control id="basic-url" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Check aria-label="Publish" label="Publish" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAdd}>
                  Cancel
                </Button>
                <Button variant="primary">Save</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}

            {/* Edit-Project Modal */}
            <Modal
              show={showEdit}
              onHide={handleCloseEdit}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3'>
                  <Form.Label>Link to Listing</Form.Label>
                  <Form.Control id="basic-url" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Check aria-label="Publish" label="Publish" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAdd}>
                  Cancel
                </Button>
                <Button variant="primary">Save</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}

            {/* Delete-Project Modal */}
            <Modal
              show={showDelete}
              onHide={handleCloseDelete}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this project listing?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                  Cancel
                </Button>
                <Button variant="primary">Delete</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}
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
