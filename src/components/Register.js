import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addDoc, collection } from 'firebase/firestore';
import { database } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import '../css/forms.css'
import img from '../assets/background.jpg';
function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(database, "students"), {
                fullName,
                email,
                password: hashedPassword,
                securityQuestion,
                securityAnswer,
            });
            console.log("student added")
            navigate('/login')

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Email already registered");
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            opacity: 0.95,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px'
        }}>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        minLength={10}
                        maxLength={20}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicSecurityQuestion">
                    <Form.Label>Security Question</Form.Label>
                    <Form.Control
                        as="select"
                        value={securityQuestion}
                        required
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                    >
                        <option value="" style={{ color: 'rgb(161, 228, 249)' }}>Select security question</option>
                        <option value="What is your favorite food?">
                            What is your favorite food?
                        </option>
                        <option value="What is your pet's name?">
                            What is your pet's name?
                        </option>
                        <option value="What city were you born in?">
                            What city were you born in?
                        </option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicSecurityAnswer">
                    <Form.Label>Security Answer</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter security answer"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" className="button">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Register;
