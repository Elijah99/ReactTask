import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ViewCertificate = ({ certificate }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleCancel = () => {
        setShow(false);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>View</Button>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
                size="xl"
            >
                <Modal.Header className="bg-secondary">
                    <Modal.Title>View certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Group as={Row} className="mb-3" controlId="title">
                            <Form.Label column sm="2">
                                Title
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    name="name"
                                    value={certificate.name}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="description">
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    as="textarea" rows={5}
                                    name="description"
                                    value={certificate.description}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="duration">
                            <Form.Label column sm="2">
                                Duration
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    name="duration"
                                    value={certificate.duration}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    name="price"
                                    value={certificate.price}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">
                                Create date
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    name="createDate"
                                    value={certificate.createDate}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">
                                Last update date
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    name="lastUpdateDate"
                                    value={certificate.lastUpdateDate}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">
                                Tags
                            </Form.Label>
                            <Col sm="10">
                                <div>
                                    {certificate.tags !== undefined ? certificate.tags.map(tag => tag.name).join(',\n') : null}
                                </div>
                            </Col>
                        </Form.Group>

                        <div className="d-flex align-items-center justify-content-center">
                            <Button className="mx-2" variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewCertificate;