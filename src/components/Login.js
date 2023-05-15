import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../css/forms.css'
import '../assets/home.jpg'
import img from '../assets/background.jpg';

const Login  = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();


    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(email)
            localStorage.setItem("userEmail", email);
            navigate("/user",{ state: { userEmail : email } })
          })
          .catch((error) => {
            console.log(error)
            alert("Incorrect email/password")
          });
    };

    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            height: '100vh',
            opacity: 0.95,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px' 
          }}>
        <Form className = "login-form" onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className="text-center">
            <Button variant="primary" type="submit" className="button">
                Login
            </Button>
            </div>
        </Form>
        </div>
    );
}

export default Login;
