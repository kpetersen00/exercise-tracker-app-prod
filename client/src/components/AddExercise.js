import React, { useRef, useState } from 'react';
import { Card, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useLog } from '../contexts/LogContext';

export default function AddExercise() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { logExercise } = useLog();
  const descRef = useRef();
  const durationRef = useRef();
  const dateRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setMessage('');
      await logExercise(
        descRef.current.value,
        durationRef.current.value,
        dateRef.current.value
      );
      setMessage('Exercise Logged');
    } catch (error) {
      setError('Failed to log exercise');
    }
    setLoading(false);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }
  return (
    // <Container>
    <Card>
      <Card.Header>Log Exercise</Card.Header>
      <Card.Body>
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='success'>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id='desc'>
            <Form.Control
              placeholder='Description'
              type='text'
              name='description'
              ref={descRef}
              required
            />
          </Form.Group>
          <Form.Group id='duration'>
            <Form.Control
              placeholder='Duration'
              type='text'
              name='duration'
              ref={durationRef}
              required
            />
          </Form.Group>
          <Form.Group id='date'>
            <Form.Control
              placeholder='date (yyyy-mm-dd)'
              type='text'
              name='date'
              ref={dateRef}
            />
          </Form.Group>
          <Button disabled={loading} className='w-100 mt-2' type='submit'>
            {loading && (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            )}
            Log Exercise
          </Button>
        </Form>
      </Card.Body>
    </Card>
    // {/* </Container> */}
  );
}
