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
  const [items, setItems] = useState<{ id: number, description: string, image: string, listingLink: string, isPublished: boolean, isDeleted: boolean }[]>([]);

  const AllItems = async () => {
    let allItems = await getAllItems();
    setItems(allItems);
  }

  const PublishedItems = async () => {
    let publishedItems = await getPublishedItems();
    setItems(publishedItems);
  }

  useEffect(() => {
    if (checkToken()) {
      setAdminOn(true);
      AllItems();
    } else {
      PublishedItems();
    }
  })

  // -------------------------------------

  const [itemId, setItemId] = useState(0);
  const [itemImage, setItemImage] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemUrl, setItemUrl] = useState('');
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemPublished, setItemPublished] = useState(false);

  const handleImage = (event: any) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let end: any = reader.result;
      setItemImage(end);
    }
    reader.readAsDataURL(file);
  }

  const handleDesc = (e: any) => setItemDesc(e.target.value);
  const handleUrl = (e: any) => setItemUrl(e.target.value);
  const handlePublish = (e: any) => setItemPublished(e.target.value);
  const handleDeleted = (e: any) => setItemDeleted(e.target.value);

  // -------------------------------------

  const [editItem, setEditItem] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShowEdit(false);
    setShowAdd(false);
    setShowDelete(false);
  }

  const handleEdit = (e: any, { description, listingLink, image, isPublished, isDeleted }: any) => {
    setShowEdit(true);
    setEditItem(true);

    setItemDesc(description);
    setItemImage(image);
    setItemUrl(listingLink);
    setItemPublished(isPublished);
    setItemDeleted(isDeleted);
  }

  const handleAdd = (e: any, { id, description, listingLink, image, isPublished, isDeleted }: any) => {
    setShowAdd(true);

    setItemId(id);
    setItemDesc(description);
    setItemImage(image);
    setItemUrl(listingLink);
    setItemPublished(isPublished);
    setItemDeleted(isDeleted);
  }

  const handleSave = async ({ target: { content } }: any) => {
    const currentItem = {
      id: itemId,
      description: itemDesc,
      image: itemImage,
      listingLink: itemUrl,
      isPublished: itemPublished,
      isDeleted: itemDeleted
    }

    handleClose();
    let result = false;
    if (editItem) {
      result = await updateItem(currentItem);
    } else {
      result = await addItem(currentItem);
    }

    if (result) {
      let userItems = await getAllItems();
      setItems(userItems);
    } else {
      alert(`Project was not ${editItem ? 'Updated' : 'Added'}`)
    }
  }

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);

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
  
  const Replacement = () => {
    return (
      <div className='replacement-card card'>
      <p className='card-text carText'>No project listings at the moment.</p>
      <p className='card-text carText'>Check back soon!</p>
    </div>
    )
  }

  // -------------------------------------

  return (
    <Container className='projects' id='projects'>
      {
        adminOn ? (
          <div>
            <p className='section-title'>Projects <AddIcon onClick={(e) => handleAdd(e, { itemId: 0, itemDesc: '', itemImage: '', itemUrl: '', itemDeleted: false, itemPublished: false })} /></p>
            <hr />
            <div className='col-lg-12 mb-5'>
              <div className='innerCarAdmin'>
                {
                  items.length > 0 ? (
                    <>
                      {
                        items.map((item, index) => (
                          <div key={index} className='carItemAdmin col-4'>
                            <div className='carCard card'>
                              <a href={item.listingLink} className='carImgContainer'>
                                <img src={item.image} className='d-block w-100 carImg' alt={item.description} />
                              </a>
                              <div className='carBodyAdmin'>
                                <Row>
                                  <p className='card-text carText'>{item.description}</p>
                                </Row>
                                <div className='lightIcons'>
                                  <Row>
                                    <Col className='col-1'>
                                      <EditOutlinedIcon onClick={(e) => handleEdit(e, { itemDesc: '', itemImage: '', itemUrl: '', itemDeleted: false, itemPublished: false })} />
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
                    </>
                  ) : (
                    <Replacement/>
                  )
                }
              </div>
            </div>

            {/* Add-Project Modal */}
            <Modal
              show={showAdd}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3'>
                  <Form.Label>Link to Listing</Form.Label>
                  <Form.Control id="basic-url" onChange={handleUrl} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" accept="image/png, image/jpg" onChange={handleImage} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={handleDesc} />
                </Form.Group>
                <Form.Check aria-label="Publish" label="Publish" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}

            {/* Edit-Project Modal */}
            <Modal
              show={showEdit}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3'>
                  <Form.Label>Link to Listing</Form.Label>
                  <Form.Control id="basic-url" onChange={handleUrl} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" accept="image/png, image/jpg" onChange={handleImage} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={handleDesc} />
                </Form.Group>
                <Form.Check aria-label="Publish" label="Publish" onChange={handlePublish} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}

            {/* Delete-Project Modal */}
            <Modal
              show={showDelete}
              onHide={handleClose}
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
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleDeleted}>Delete</Button>
              </Modal.Footer>
            </Modal>
            {/*  */}
          </div >

        ) : (
          <div>
            <p className='section-title'>Projects</p>
            <hr className='hrLength' />
            {
              items.length > 0 ? (
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
                          <Replacement/>
                          <Replacement/>
                        </>
                      ) : items.length == 2 ? (
                        <>
                         <Replacement/>
                        </>
                      ) : null
                    }
                  </div>
                </div>
              ) : (
                <>
                  <Replacement/>
                </>
              )
            }
          </div>
        )
      }

    </Container >
  )
}
