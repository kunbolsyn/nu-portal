import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://senior-project-java-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        }
      );

      if (response.status === 200) {
        const authHeader = response.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          localStorage.setItem("token", token);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "student");
          localStorage.setItem("username", username);

          console.log(token);
          navigate("/dashboard");
          window.location.reload(); // Force refresh to apply role-based routing
        } else {
          alert("Login successful, but token not received.");
        }
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong during login.");
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

            {/* 🔒 Previous local login logic (commented out for backup)
            useEffect(() => {
              fetch("/data/users.json")
                .then((res) => res.json())
                .then((data) => setUsers(data))
                .catch((err) => console.error("Failed to load users:", err));
            }, []);

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
            */}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
