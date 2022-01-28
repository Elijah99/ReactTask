import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const DeleteCertificate = (props) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleCancel = () => {
        setShow(false);
    }

    const handleDelete = () => {
        props.handleDeleteCertificate(props.id);
        setShow(false);
        window.location.reload();
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header className="bg-secondary">
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-3">Do you really want to delete certificate with id = {props.id} ?</div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Button className="mx-2" variant="danger" onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button className="mx-2" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteCertificate;