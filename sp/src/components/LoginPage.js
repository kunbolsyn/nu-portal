import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", matchedUser.role);
      localStorage.setItem("username", matchedUser.username);

      navigate("/dashboard");
      window.location.reload(); // Force reload for route to pick up role
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="topbar">
        <img
          src={`${process.env.PUBLIC_URL}/NU-logo.png`}
          alt="Logo"
          className="topbar-logo"
        />
      </div>

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="login-card">
          <Card.Body>
            <h4 className="text-center portal-title">
              Welcome to the internal information portal of <br />
              <strong>NAZARBAYEV UNIVERSITY</strong>
            </h4>

            <Form onSubmit={handleLogin}>
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

              <Button type="submit" className="w-100 mt-4 login-btn">
                Login
              </Button>

              <Button className="w-100 mt-2 google-login">
                <img
                  src={`${process.env.PUBLIC_URL}/google-logo.png`}
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
