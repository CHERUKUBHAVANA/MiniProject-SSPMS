import React from 'react'
import '../css/resume.css'
import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from "../firebase";
import html2pdf from 'html2pdf.js';
import { Image } from 'react-bootstrap'
// import 'material-icons/iconfont/material-icons.css'
import { FaPhone, FaEnvelope, } from 'react-icons/fa';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BsFillFileEarmarkPdfFill, BsLinkedin, BsTrophyFill, BsFillLightbulbFill, BsFillPersonFill, BsFillMortarboardFill, BsAward, BsArrowDownCircleFill, BsDownload } from "react-icons/bs";

const Resume = () => {
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail)
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        careerObjective: '',
        XInstitute: '',
        XPercentage: '',
        XIIInstitute: '',
        XIIPercentage: '',
        XIIBranch: '',
        UGInstitute: '',
        UGPercentage: '',
        UGBranch: '',
        projects: [],
        XCompletion: '',
        XIICompletion: '',
        UGCompletion: '',
        skills: [],
        Tskills: [],
        imageUrl: ''
    })

    const resumeRef = useRef(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userEmail) {
                    const collectionRef = collection(database, 'basic_details');
                    const querySnapshot = await getDocs(collectionRef);
                    // console.log("Found")
                    // console.log(querySnapshot.docs)
                    for (const doc of querySnapshot.docs) {
                        console.log(doc.data())
                        if (doc.data().email === userEmail) {
                            // console.log("Equal")
                            console.log(doc.data())
                            setDetails({
                                name: doc.data().name,
                                email: doc.data().email,
                                phone: doc.data().phone,
                                careerObjective: doc.data().careerObjective,
                                XInstitute: doc.data().XInstitute,
                                XPercentage: doc.data().XPercentage,
                                XIIInstitute: doc.data().XIIInstitute,
                                XIIPercentage: doc.data().XIIPercentage,
                                XIIBranch: doc.data().XIIBranch,
                                UGInstitute: doc.data().UGInstitute,
                                UGPercentage: doc.data().UGPercentage,
                                UGBranch: doc.data().UGBranch,
                                projects: doc.data().projects,
                                XCompletion: doc.data().XCompletion,
                                XIICompletion: doc.data().XIICompletion,
                                UGCompletion: doc.data().UGCompletion,
                                skills: doc.data().skills,
                                Tskills: doc.data().Tskills,
                                imageUrl: doc.data().imageUrl
                            })
                        }
                    };
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);

    const handleDownload = () => {
        const element = resumeRef.current;
        if (!element) {
            return; // Guard against null reference
        }
        console.log("Download clicked")
        const opt = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div>
            <Navbar expand="lg" className="navbar sticky-top" variant="light" collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="nav-button" href="/user">Back to Dashboard</Nav.Link>
                            <Nav.Link className="nav-items" href="/profile">View Profile</Nav.Link>
                            <Nav.Link className="nav-items" href="/skills">My Skillset</Nav.Link>
                            <Nav.Link className="nav-items" href="/projects">My Projects</Nav.Link>
                            <Nav.Link className="nav-items" href="/exams">Exam Schedules</Nav.Link>
                            <button className='download-button' onClick={handleDownload}>Download PDF  <BsDownload /></button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div ref={resumeRef} className='resume-container'>
                <div className='top'>
                    <h1 className='student-name'>{details.imageUrl && (
                        <img src={details.imageUrl} alt="Profile" className="profile-image" />
                    )}{details.name}</h1>
                    <div className='contact-info'>
                        <FaEnvelope /> {details.email}<br />
                        <FaPhone /> {details.phone}
                    </div>
                </div>
                <div className='bottom'>
                    <div className='side-bar'>
                        <div className='career-objective'>
                            <u><h2><BsFillLightbulbFill />    Career Objective</h2></u>
                            <p>{details.careerObjective}</p>
                        </div>
                        <div className='education'>
                            <u><h2><BsFillMortarboardFill />     Education</h2></u>
                            <h3>X<span> ({details.XCompletion})</span></h3>
                            <p>Institute : {details.XInstitute}</p>
                            <p>Percentage : {details.XPercentage}</p>
                            <h3>XII <span>({details.XIICompletion})</span></h3>
                            <p>Institute : {details.XIIInstitute}</p>
                            <p>Branch : {details.XIIBranch}</p>
                            <p>Percentage : {details.XIIPercentage}</p>
                            <h3>UnderGraduation <span>({details.UGCompletion})</span></h3>
                            <p>Institute : {details.UGInstitute}</p>
                            <p>Branch : {details.UGBranch}</p>
                            <p>Percentage : {details.UGPercentage}</p>
                        </div>

                    </div>
                    <div className='main-content'>
                        <div className='projects'>
                            <u><h2>Projects</h2></u>
                            {
                                details.projects && details.projects.map((project, index) => (
                                    project.duration && project.title && project.technologies && project.outcomes && <div key={index}>
                                        <h3>{project.title}</h3>
                                        <p>Completed in {project.duration} using the technologies {project.technologies}. This project {project.outcomes}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='soft-skills'>
                            <u><h2>Soft Skills</h2></u>
                            <ul>
                                {
                                    details.skills && details.skills.map((skill, index) => {
                                        return <li>{skill}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='tech-skills'>
                            <u><h2>Technical Skills</h2></u>
                            <ul>
                                {
                                    details.Tskills && details.Tskills.map((skill, index) => {
                                        return <li>{skill}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Resume