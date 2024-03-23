import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import '../styles/bootstrap.css';

function ImagePicker({ show, handleClose, onSubmit }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);
    const [name, setName] = useState('');

    const onClose = () => {
        setSelectedFile(null);
        setAccessToken('');
        setIsSubmitting(false);
        setErrorAlert(null);
        handleClose();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrorAlert(null);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('access_token', accessToken); // Append the access token to formData
        formData.append('author', name);


        fetch('https://btschwartz.com/api/v1/pics/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 403) { // Check for a 403 status
                    throw Error('Forbidden');
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                onSubmit(data);
                onClose();
            })
            .catch((error) => {
                if (error.message === 'Forbidden') {
                    setErrorAlert('Access denied. Please check your access token.');
                } else {
                    setErrorAlert('Error uploading image (is the file too big?)');
                }
                console.error('Error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAccessTokenChange = (event) => {
        setAccessToken(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <>
        <Modal show={show} onHide={onClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Picture Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="imageFilePicker">
                        <Form.Label>Select an image file:</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="accessToken">
                        <Form.Label>Access Token:</Form.Label>
                        <Form.Control
                            type="text"
                            value={accessToken}
                            onChange={handleAccessTokenChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button
                    variant={isSubmitting ? "secondary" : "primary"}
                    onClick={handleSubmit}
                    disabled={!selectedFile || !name || isSubmitting}
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default ImagePicker;
