import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import '../styles/bootstrap.css';






function LoginModal({ show, handleClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); 
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = () => {
    setSubmitting(true);
    setErrorMessage('');

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        token: token,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage('Invalid username or password');
          }
          else {
            setErrorMessage('Something went wrong :(');
          }
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        
        setSubmitting(false); // Moved inside the then block
        handleClose();
      })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        setSubmitting(false); // Moved inside the catch block
      });
  };




  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="token">
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </Form.Group>
            
            {errorMessage && (
              <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
