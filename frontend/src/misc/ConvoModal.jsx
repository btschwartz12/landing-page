import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/bootstrap.css';




function ConversationModal({ show, handleClose, apiURL }) {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const abortControllerRef = useRef(null);

    useEffect(() => {
        setMessages([
            { type: 'user', text: 'Hello, Chatbot!' },
            { type: 'bot', text: 'Hello! How can I help you today?' }
          ]);
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort(); // Cancel the fetch request when the component is unmounted
            }
        };
    }, []);

    const handleAccessTokenChange = (event) => {
        setAccessToken(event.target.value);
    };


    const onClose = () => {
        if (abortControllerRef.current) {
            setErrorAlert(null);
            setInputValue('');
            abortControllerRef.current.abort(); // Cancel the fetch request when the modal is closed
        }
        handleClose();
    };

    const handleClearConversation = () => {
        if (window.confirm('Are you sure you want to clear the entire conversation?')) {
            setMessages([
                { type: 'user', text: 'Hello, Chatbot!' },
                { type: 'bot', text: 'Hello! How can I help you today?' }
              ]);
        }
    };

    const handleSubmit = () => {

        if (inputValue === '' || accessToken === '') {
            return;
        }

        abortControllerRef.current = new AbortController();

        setIsSubmitting(true);
        setErrorAlert(null);
        const newMessages = [...messages, { type: 'user', text: inputValue }];
        // setMessages(newMessages);

        
        
        const data = {
            "prompt": inputValue,
            "model": "gpt-4",
            "system_prompt": "",
            "prev_messages": messages

        }
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: abortControllerRef.current.signal,
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
                const resp = data.response;
                newMessages.push({ type: 'bot', text: resp });
                setMessages(newMessages);
                setInputValue('');
            })
            .catch((error) => {
                if (error.message === 'Forbidden') {
                    setErrorAlert('Access denied. Please check your access token.');
                } else {
                    setErrorAlert('Error generating message');
                }
                console.error('Error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>GPT-4 Conversation</Modal.Title>
            </Modal.Header>
            <Form.Group
                className="mb-3"
                controlId="accessToken"
                style={{ marginLeft: '16px', marginRight: '16px' }}
            >
                
                <Form.Control
                    type="text"
                    placeholder="Access token"
                    value={accessToken}
                    onChange={handleAccessTokenChange}
                />
            </Form.Group>
            <Modal.Body>
                <div
                    className="chat-container"
                    style={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.type}`}
                            style={{
                                alignSelf: message.type !== 'user' ? 'flex-start' : 'flex-end',
                                backgroundColor:
                                    message.type === 'user' ? '#cce5ff' : '#adb5bd',
                                borderRadius: '12px',
                                padding: '6px 12px',
                                marginBottom: '4px',
                                maxWidth: '70%',
                            }}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                {isSubmitting && (
                    <div className="text-center">
                        <Spinner animation="grow" variant="primary" size="sm" />
                        <Spinner animation="grow" variant="primary" size="sm" />
                        <Spinner animation="grow" variant="primary" size="sm" />
                    </div>
                )}
            <Form>
                
            </Form>
            </Modal.Body>
            {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
            <Modal.Footer>
                
                <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                
                <Button variant="danger" onClick={handleClearConversation}>
                    Clear
                </Button>
                <Button
                    variant={isSubmitting ? "secondary" : "primary"}
                    onClick={handleSubmit}
                    disabled={isSubmitting || inputValue === '' || accessToken === ''}
                >
                    Send
                </Button>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close and Save
                </Button> */}
            </Modal.Footer>
            
        </Modal>
    );
}

export default ConversationModal;
