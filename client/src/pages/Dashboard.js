import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import AddExercise from '../components/AddExercise';
import DisplayExercises from '../components/DisplayExercises';
import LineChart from '../components/LineChart';

export default function Dashboard() {
  const { currentUser } = useAuth();

  console.log(currentUser);

  return (
    <Container fluid='true'>
      <Row fluid='true'>
        <Col md={{ span: 9 }}>
          <LineChart />
          <AddExercise />
        </Col>
        <Col md={{ span: 3 }} className='h-100'>
          <DisplayExercises />
        </Col>
      </Row>
    </Container>
  );
}
