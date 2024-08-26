import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { rainbow, logo } from 'assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from 'features/auth/authService';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errors } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  // const isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(authenticateUser({ email, password, role })).unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });;
  };


  return (
    <Container fluid className="login-account">
      <Row className="h-100">
        <Col lg={6} className="align-self-start position-relative">
          <div
            className="account-info-area"
            style={{ backgroundImage: `url(${rainbow})`, backgroundColor: '#253875' }}>
            <div className="overlay"></div>
            <div className="login-content">
              <img src={logo} alt="Logo" style={{ maxWidth: '120px', marginBottom: '20px' }} />
              <p className="sub-title">Human Resource Management System</p>
              <h1 className="title">BUKC</h1>
            </div>
          </div>
        </Col>
        <Col lg={6} md={7} sm={12} className="mx-auto align-self-center">
          <div className="login-form">
            <div className="login-head">
              <h3 className="title">Welcome Back</h3>
              <p>Login page allows users to enter login credentials for authentication and access to secure content.</p>
            </div>
            <h6 className="login-title">
              <span>Login</span>
            </h6>
            <Form onSubmit={onLogin}>
              <Form.Group className="mb-4">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  isInvalid={!!errors?.role}
                >
                  <option value="">Select User Type</option>
                  <option value="Admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </Form.Control>
                {errors?.role && <Form.Control.Feedback type="invalid">{errors?.role}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors?.email}
                />
                {errors?.email && <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors?.message}
                />
                {errors?.message && <Form.Control.Feedback type="invalid">{errors?.message}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group className="d-flex justify-content-between mt-4 mb-2">
                <Form.Check
                  type="checkbox"
                  label="Remember my preference"
                  id="customCheckBox1"
                />
              </Form.Group>
              <div className="text-center mb-4">
                <Button type="submit" className="btn-primary btn-block">
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
