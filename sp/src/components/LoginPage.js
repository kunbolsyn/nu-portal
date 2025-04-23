import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../styles/LoginPage.css";

const API_BASE = "https://senior-project-java-backend.onrender.com";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // actually email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ fixed state declaration

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // clear previous messages

    try {
      // 1) Log in and grab token
      const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (loginRes.status !== 200) {
        setMessage("Invalid username or password.");
        return;
      }

      const authHeader = loginRes.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        setMessage("Login succeeded but no token returned.");
        return;
      }

      const token = authHeader.split(" ")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);

      let role = "student";
      try {
        const acctRes = await fetch(
          `${API_BASE}/api/v1/account/email/${encodeURIComponent(username)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          `Fetching account info from ${acctRes.url} — status ${acctRes.status}`
        );

        if (!acctRes.ok) {
          const errText = await acctRes.text();
          setMessage(
            `Error ${acctRes.status}: ${errText || acctRes.statusText}`
          );
        } else {
          const acctData = await acctRes.json();
          console.log("👤 Account response JSON:", acctData);
          if (acctData.role) {
            role = acctData.role;
            setMessage(`Login succeeded, role: ${role}`);
          } else {
            setMessage("Login succeeded, but response had no `role` field");
          }
        }
      } catch (err) {
        setMessage("Fetch failed: " + err.message);
      }

      localStorage.setItem("userRole", role.toLowerCase());

      // 3) Navigate into the app
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Something went wrong during login.");
    } finally {
      setIsLoading(false);
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
                  placeholder="Username (email)"
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

              <Button
                type="submit"
                className="w-100 mt-4 login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
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

            {/* ✅ Display message */}
            {message && (
              <div className="mt-3 text-danger text-center">{message}</div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
