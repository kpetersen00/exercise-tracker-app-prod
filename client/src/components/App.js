import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRoute from '../routes/PrivateRoute';
import ForgotPassword from '../pages/ForgotPassword';
import UpdateProfile from '../pages/UpdateProfile';
import Navigation from './Navbar';
import PublicRoute from '../routes/PublicRoute';
import LogProvider from '../contexts/LogContext';
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <Container
            fluid
            className=' d-flex '
            style={{ height: '90vh', marginTop: '5rem' }}
          >
            <div className='w-100'>
              <Routes>
                <Route
                  exact
                  path='/'
                  element={
                    <PrivateRoute>
                      <LogProvider>
                        <Dashboard />
                      </LogProvider>
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/update-profile'
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/signup'
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route
                  path='/login'
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path='/forgot-password'
                  element={
                    <PublicRoute>
                      <ForgotPassword />
                    </PublicRoute>
                  }
                />
              </Routes>
            </div>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
