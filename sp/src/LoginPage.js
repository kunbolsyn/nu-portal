import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./LoginPage.css"; // Updated styles

const LoginPage = () => {
  return (
    <div
      className="login-page"
      style={{
        background: `url(${process.env.PUBLIC_URL}/bg.png) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="login-card">
          <Card.Body>
            {/* Title */}
            <h4 className="text-center portal-title">
              Welcome to the internal information portal of <br />
              <strong>NAZARBAYEV UNIVERSITY</strong>
            </h4>

            {/* Login Form */}
            <Form>
              {/* Username Field */}
              <Form.Group controlId="formBasicUsername">
                <Form.Control type="text" placeholder="Username" className="custom-input" />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Control type="password" placeholder="Password" className="custom-input" />
              </Form.Group>

              {/* Login Button */}
              <Button type="submit" className="w-100 mt-4 login-btn">
                Login
              </Button>

              {/* Google Login Button */}
              <Button className="w-100 mt-2 google-login">
                <span>Login using Google</span>
                <img
                  src={`${process.env.PUBLIC_URL}/Google image.png`}
                  alt="Google logo"
                  className="google-logo"
                />
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
