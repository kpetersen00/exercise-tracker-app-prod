import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Navigation() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to Log Out');
    }
  }

  return (
    <Navbar bg='dark' variant='dark' fixed='top' className='px-5 '>
      {error && alert(error)}
      <LinkContainer to='/'>
        <Navbar.Brand>Exercise Tracker</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>
      {currentUser ? (
        <Nav>
          <Navbar.Text>Signed in as: </Navbar.Text>
          <LinkContainer to='/update-profile'>
            <Nav.Link>{currentUser.email}</Nav.Link>
          </LinkContainer>
          <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <LinkContainer to='/login'>
            <Nav.Link>Log In</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/signup'>
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
        </Nav>
      )}
    </Navbar>
  );
}
