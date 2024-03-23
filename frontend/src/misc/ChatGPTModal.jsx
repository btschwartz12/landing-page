import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../styles/bootstrap.css';

function ChatGPTModal({ show, handleClose, onSubmit }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        handleClose();
    };

    return (
        <>
        <Modal show={show} onHide={handleClose} centered
        scrollable>
            <Modal.Header closeButton>
            <Modal.Title>Ask ChatGPT (gpt-3.5-turbo)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Use $0.000002 of my own money to ask ChatGPT whatever you want! Place your prompt below:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                </Form.Group>
                <Form.Label>Be aware, longer responses are not fully supported.</Form.Label>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ChatGPTModal;