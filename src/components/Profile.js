import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Button, FormControl } from "react-bootstrap";
import { addDoc, collection, getDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import img from '../assets/background.jpg'
import '../css/forms.css'
import { database } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getDatabase, ref as dbRef, push, set } from "firebase/database";


const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        email: "",
        phone: "",
        careerObjective: "",
        XInstitute: "",
        XPercentage: "",
        XCompletion: "",
        XIIInstitute: "",
        XIIBranch: "",
        XIIPercentage: "",
        XIICompletion: "",
        UGInstitute: "",
        UGBranch: "",
        UGPercentage: "",
        UGCompletion: "",
        skills: "",
        // projects: ''
    });
    const navigate = useNavigate()
    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedImage(URL.createObjectURL(file));
    // };
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userEmail) {
                    const collectionRef = collection(database, 'basic_details');
                    const querySnapshot = await getDocs(collectionRef);

                    for (const docu of querySnapshot.docs) {
                        if (docu.data().email === userEmail) {
                            const documentId = docu.id;
                            const userRef = doc(database, 'basic_details', documentId);
                            const userDoc = await getDoc(userRef);
                            if (userDoc.exists) {
                                const data = userDoc.data();
                                setFormData(data);
                            }
                        }
                    };
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [userEmail]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // const storage = getStorage();
    // const handleUploadImage = async () => {
    //     if (selectedImage) {
    //       const storageRef = ref(storage, `images/${selectedImage.name}`);
    //       try {
    //         await uploadBytes(storageRef, selectedImage);
    //         console.log('Image uploaded successfully!');
    //         const imageUrl = await getDownloadURL(storageRef);

    //         const collectionRef = collection(database, "basic_details");
    //         const querySnapshot = await getDocs(collectionRef);

    //         for (const docu of querySnapshot.docs) {
    //           if (docu.data().email === formData.email) {
    //             const db = getDatabase();
    //             const basicDetailsRef = doc(database, "basic_details", docu.id);
    //             const existingData = docu.data();
    //             const updatedData = {
    //               ...existingData,
    //               imageUrl: imageUrl
    //             };
    //             await setDoc(basicDetailsRef, updatedData);
    //             setFormData(updatedData);
    //           }
    //         }

    //         console.log('Image details stored in "basic_details" collection!');
    //       } catch (error) {
    //         console.log('Error uploading image:', error);
    //       }
    //     }
    //   };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const collectionRef = collection(database, "basic_details");
            const querySnapshot = await getDocs(collectionRef);
            let existingDocId = null;

            querySnapshot.forEach((doc) => {
                if (doc.data().email === formData.email) {
                    existingDocId = doc.id;
                }
            });

            if (existingDocId) {
                await setDoc(doc(database, "basic_details", existingDocId), {
                    name: formData.name,
                    dob: formData.dob,
                    gender: formData.gender,
                    maritalStatus: formData.maritalStatus,
                    email: formData.email,
                    phone: formData.phone,
                    careerObjective: formData.careerObjective,
                    XInstitute: formData.XInstitute,
                    XPercentage: formData.XPercentage,
                    XIIInstitute: formData.XIIInstitute,
                    XIIBranch: formData.XIIBranch,
                    XIIPercentage: formData.XIIPercentage,
                    UGInstitute: formData.UGInstitute,
                    UGBranch: formData.UGBranch,
                    UGPercentage: formData.UGPercentage,
                    XCompletion: formData.XCompletion,
                    XIICompletion: formData.XIICompletion,
                    UGCompletion: formData.UGCompletion
                });
                alert('Profile updated successfully')
            } else {
                await addDoc(collectionRef, {
                    name: formData.name,
                    dob: formData.dob,
                    gender: formData.gender,
                    maritalStatus: formData.maritalStatus,
                    email: formData.email,
                    phone: formData.phone,
                    careerObjective: formData.careerObjective,
                    XInstitute: formData.XInstitute,
                    XPercentage: formData.XPercentage,
                    XIIInstitute: formData.XIIInstitute,
                    XIIBranch: formData.XIIBranch,
                    XIIPercentage: formData.XIIPercentage,
                    UGInstitute: formData.UGInstitute,
                    UGBranch: formData.UGBranch,
                    UGPercentage: formData.UGPercentage,
                    XCompletion: formData.XCompletion,
                    XIICompletion: formData.XIICompletion,
                    UGCompletion: formData.UGCompletion
                });
                alert("Profile added successfully")
            }
            navigate('/user')
        } catch (e) {
            console.error("Error adding/updating document: ", e);
        }
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
            <div className="back-button-div">
                <Link to="/user" className="back-button">
                    Back to Dashboard
                </Link>
            </div>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}

                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMaritalStatus">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                            >
                                <option>Select Marital Status</option>
                                <option>Single</option>
                                <option>Married</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}

                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formPhone">
                    <Form.Label>Academics</Form.Label>
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Text>X</InputGroup.Text>
                    <Form.Control aria-label="Institution" placeholder="Institution" type='text' name='XInstitute' value={formData.XInstitute} onChange={handleInputChange} />
                    <Form.Control aria-label="Percentage" placeholder="Percentage secured" type='text' name='XPercentage' value={formData.XPercentage} onChange={handleInputChange} />
                    <Form.Control aria-label="Year of Completion" placeholder="Year of Completion" type='text' name='XCompletion' value={formData.XCompletion} onChange={handleInputChange} />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>XII</InputGroup.Text>
                    <Form.Control aria-label="Branch" placeholder="Branch" type='text' name='XIIBranch' value={formData.XIIBranch} onChange={handleInputChange} />
                    <Form.Control aria-label="Institution" placeholder="Institution" type='text' name='XIIInstitute' value={formData.XIIInstitute} onChange={handleInputChange} />
                    <Form.Control aria-label="Percentage" placeholder="Percentage secured" type='text' name='XIIPercentage' value={formData.XIIPercentage} onChange={handleInputChange} />
                    <Form.Control aria-label="Year of Completion" placeholder="Year of Completion" type='text' name='XIICompletion' value={formData.XIICompletion} onChange={handleInputChange} />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>UG</InputGroup.Text>
                    <Form.Control aria-label="Branch" placeholder="Branch" type='text' name='UGBranch' value={formData.UGBranch} onChange={handleInputChange} />
                    <Form.Control aria-label="Institution" placeholder="Institution" type='text' name='UGInstitute' value={formData.UGInstitute} onChange={handleInputChange} />
                    <Form.Control aria-label="Percentage" placeholder="Percentage secured" type='text' name='UGPercentage' value={formData.UGPercentage} onChange={handleInputChange} />
                    <Form.Control aria-label="Year of Completion" placeholder="Year of Completion" type='text' name='UGCompletion' value={formData.UGCompletion} onChange={handleInputChange} />
                </InputGroup>
                <Form.Group controlId="formPhone">
                    <Form.Label>Career Objective</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        type="textarea"
                        name="careerObjective"
                        value={formData.careerObjective}
                        onChange={handleInputChange}

                    />
                </Form.Group>
                {/* <Form.Group controlId="formImage">
                    <Form.Label>Upload Image</Form.Label>
                    <FormControl type="file" onChange={handleImageChange} />
                    <Button variant="primary" onClick={handleUploadImage}>Upload Image</Button>
                </Form.Group> */}
                <br />
                <div className="text-center">
                    <Button variant="primary" type="submit" className="button">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>

    )

}
export default Profile