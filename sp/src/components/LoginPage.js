import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../styles/LoginPage.css"; // Ensure correct path

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication (replace with real API later)
    if (username === "admin" && password === "Admin123!@#") {
      localStorage.setItem("isAuthenticated", "true"); // ✅ Save session
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="login-card">
          <Card.Body>
            {/* Title */}
            <h4 className="text-center portal-title">
              Welcome to the internal information portal of <br />
              <strong>NAZARBAYEV UNIVERSITY</strong>
            </h4>

            {/* Login Form */}
            <Form onSubmit={handleLogin}>
              {/* Username Field */}
              <Form.Group controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="custom-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="custom-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Login Button */}
              <Button type="submit" className="w-100 mt-4 login-btn">
                Login
              </Button>

              {/* Google Login Button */}
              <Button className="w-100 mt-2 google-login">
                <img
                  src={`${process.env.PUBLIC_URL}/google-logo.png`} // ✅ Fixed Filename Issue
                  alt="Google logo"
                  className="google-logo"
                />
                <span>Login using Google</span>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
