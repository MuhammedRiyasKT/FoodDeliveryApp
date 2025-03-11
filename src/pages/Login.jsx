import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userLoginApi, userRegisterApi } from '../services/allApi';
import loginPng from '../assets/login.png';

function Auth({ insideRegister }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.email && userDetails.password) {
      try {
        const result = await userRegisterApi(userDetails);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username}, please login to explore our website`);
          setUserDetails({ username: '', email: '', password: '' });
          navigate('/login');
        } else if (result.status === 406) {
          toast.warning(result.response.data);
          setUserDetails({ username: '', email: '', password: '' });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error('Please complete all fields');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userDetails.email && userDetails.password) {
      try {
        const result = await userLoginApi(userDetails);
        if (result.status === 200) {
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
          sessionStorage.setItem('token', result.data.token);
          navigate(result.data.user.roll === 'User' ? '/' : '/admin-dashboard');
        } else {
          toast.error('Invalid username or password');
        }
      } catch (error) {
        toast.error('Something went wrong! Please try again.');
        console.error('Login error:', error);
      }
    } else {
      toast.error('Please enter email and password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-100 shadow-lg border-0 rounded-3 p-4" style={{ maxWidth: '900px', backgroundColor: 'lightgreen' }}>
        <div className="row g-0 align-items-center">
          <div className="col-md-6 text-center d-none d-md-block">
            <img className="img-fluid rounded-4" src={loginPng} alt="Login Illustration" style={{ maxWidth: '80%' }} />
          </div>
          <div className="col-md-6 p-4">
            <h4 className="text-center text-black">
              <i className="fa-solid fa-hotel"></i> Silver Star
            </h4>
            <h5 className="text-center text-secondary mb-4">Sign {insideRegister ? 'Up' : 'In'} to your Account</h5>
            <form onSubmit={insideRegister ? handleRegister : handleLogin}>
              {insideRegister && (
                <FloatingLabel controlId="floatingUsername" label="User Name" className="mb-3">
                  <Form.Control
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    value={userDetails.username}
                    type="text"
                    placeholder="Enter your name"
                  />
                </FloatingLabel>
              )}
              <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  value={userDetails.email}
                  type="email"
                  placeholder="Enter your email"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  value={userDetails.password}
                  type="password"
                  placeholder="Enter your password"
                />
              </FloatingLabel>
              <div className="mt-4">
                <button type="submit" className="btn btn-info w-100">
                  {insideRegister ? 'Sign Up' : 'Sign In'}
                </button>
                <p className="text-center mt-3">
                  {insideRegister ? (
                    <>Already have an account? <Link className="text-info" to='/login'>Login</Link></>
                  ) : (
                    <>Don't have an account yet? <Link className="text-info" to='/register'>Register</Link></>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
