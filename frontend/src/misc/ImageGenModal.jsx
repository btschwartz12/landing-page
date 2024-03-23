import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import '../styles/bootstrap.css';




function ImageGenModal({ show, handleClose, onSubmit }) {
    const [inputValue, setInputValue] = useState('');
    // const [accessToken, setAccessToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageURL, setImageURL] = useState('');

    const handleImageModalClose = () => {
        setShowImageModal(false);
    };
    
    const handleImageSubmit = (image_url) => {
        setImageURL(image_url);
        setShowImageModal(true);
    };


    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrorAlert(null);
        const formData = new FormData();
        formData.append('access_token', 'robby13'); // Append the access token to formData
        formData.append('prompt', inputValue);


        fetch('https://btschwartz.com/api/v1/pics/generate', {
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
                console.log(data)
                const image_url = data.url;
                handleImageSubmit(image_url);
                setInputValue('');
                handleClose();
            })
            .catch((error) => {
                if (error.message === 'Forbidden') {
                    setErrorAlert('Access denied. Please check your access token.');
                } else {
                    setErrorAlert('Error deleting image');
                }
                console.error('Error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };


    // const handleAccessTokenChange = (event) => {
    //     setAccessToken(event.target.value);
    // };

    return (
        <>
        <Modal show={show} onHide={handleClose} centered
        scrollable>
            <Modal.Header closeButton>
            <Modal.Title>OpenAI Image Generator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Place your image prompt below:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="accessToken">
                        <Form.Label>Access Token:</Form.Label>
                        <Form.Control
                            type="text"
                            value={accessToken}
                            onChange={handleAccessTokenChange}
                        />
                </Form.Group> */}
            </Form>
            {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button
                    variant={isSubmitting ? "secondary" : "primary"}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showImageModal} onHide={handleImageModalClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Generated Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={imageURL} alt="Generated" style={{ width: '100%' }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleImageModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ImageGenModal;