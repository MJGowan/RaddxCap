import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import CaretPrev from '@mui/icons-material/ArrowBackIos';
import CaretNext from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './adminprojects.css';
import { addItem, getAllItems, updateItem, deleteItem } from '../../Services/DataService';

export default function Projects() {

    const [items, setItems] = useState<{ id: number, description: string, image: string, listingLink: string, isPublished: boolean, isDeleted: boolean }[]>([]);

    const AllItems = async () => {
        let allItems = await getAllItems();
        setItems(allItems);
    }

    
        AllItems();
    

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
        const item = {
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
            result = await updateItem(item);
        } else {
            result = await addItem(item);
        }

        if (result) {
            AllItems();
        } else {
            alert(`Project Was Not ${editItem ? 'Updated' : 'Added'}`)
        }
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleDelete = async (item: any) => {
        item.isDeleted = !item.isDeleted;
        let result = await updateItem(item);
        if (result) {
            AllItems();
        } else {
            alert('Project Was Not Deleted')
        }
    }

    // -------------------------------------

    const AdminReplacement = () => {
        return (
            <div className='admin-replacement-card card'>
                <p className='card-text carText'>No project listings at the moment.</p>
                <p className='card-text carText'>Check back soon!</p>
            </div>
        )
    }

    // -------------------------------------

    return (
        <Container id='adminprojects'>
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
                                                                    <EditOutlinedIcon onClick={(e) => handleEdit(e, item)} />
                                                                </Col>
                                                                <Col className='col-1'>
                                                                    <DeleteOutlineOutlinedIcon onClick={handleShowDelete} />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                                
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
                                                        <Button variant="primary" onClick={() => handleDelete(item)}>Delete</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                {/*  */}
                                            </div>
                                        ))
                                    }
                                </>
                            ) : (
                                <AdminReplacement />
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

            </div >

        </Container >
    )
}