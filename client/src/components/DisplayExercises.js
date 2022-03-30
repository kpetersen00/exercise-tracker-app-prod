import React, { useEffect, useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { useLog } from '../contexts/LogContext';

export default function DisplayExercises() {
  const [error, setError] = useState('');
  const { getExercises, log } = useLog();
  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    try {
      setError('');
      await getExercises();
    } catch (error) {
      setError('error retrieving log');
    }
  }

  function displayLog(exercises) {
    if (!error) {
      if (!exercises.length)
        return <Alert variant='danger'>No Exercise have been logged</Alert>;

      exercises.length = 5;

      return exercises.map((exercise, index) => (
        <Card.Body key={index}>
          <Card.Title>{exercise.description}</Card.Title>
          <Card.Text>{exercise.duration} min</Card.Text>
          <Card.Text>
            {new Date(parseInt(exercise.date)).toDateString()}
          </Card.Text>
        </Card.Body> // }
      ));
    } else {
      return (
        <Alert variant='danger'>There was an error retrieving the logs</Alert>
      );
    }
  }

  return (
    <Card style={{ height: '100%', overflow: 'hidden' }}>
      <Card.Header>Recent Exercises</Card.Header>
      {displayLog(log)}
    </Card>
  );
}
