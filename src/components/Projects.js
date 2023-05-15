import { addDoc, doc, getDoc, getDocs, updateDoc, setDoc} from 'firebase/firestore';
import '../css/projects.css'
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection } from 'firebase/firestore';
import { database } from '../firebase';
import img from '../assets/process_background.jpg'
import { Navbar,Nav, Container } from "react-bootstrap";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
      title: '',
      duration: '',
      technologies: '',
      outcomes: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const userEmail = localStorage.getItem("userEmail"); 
    useEffect(()=>{
      const fetchProjectsData = async() => {
        try {
            if (userEmail) {
              const collectionRef = collection(database, 'basic_details');
              const querySnapshot = await getDocs(collectionRef);
              setProjects([]);
              for (const docu of querySnapshot.docs) {
                if (docu.data().email === userEmail) {
                  const documentId = docu.id;
                  const userRef = doc(database, 'basic_details', documentId);
                  const userDoc = await getDoc(userRef);
                  if (userDoc.exists) {
                      console.log('exists')
                    const data = userDoc.data();
                    setProjects(data.projects);
                  }
                }
              };
            }
          } catch (error) {
            console.log(error);
          }
    }
    fetchProjectsData()
    },[])

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    };
    const handleAddProject = async() => {
      if (isEditMode) {
        console.log("Added")
        const updatedProjects = [...projects];
        updatedProjects[editIndex] = newProject;
        setProjects(updatedProjects);
        setIsEditMode(false);
        setEditIndex(null);
      } else if( projects) {
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
      setNewProject({
        title: '',
        duration: '',
        technologies: '',
        outcomes: '',
      });
      try {
        if (userEmail) {
          const collectionRef = collection(database, 'basic_details');
          const querySnapshot = await getDocs(collectionRef);
  
          for (const docu of querySnapshot.docs) {
            if (docu.data().email === userEmail) {
              const documentId = docu.id;
              const userRef = doc(database, 'basic_details', documentId);
              if(projects && projects.length>0)
              await updateDoc(userRef, {
                projects: [...projects, newProject],
              });
              else{
                await setDoc(userRef,{
                  ...docu.data(),
                  projects: [newProject]
                  
                })
                setProjects(projects)
              }
              
              console.log('Project added successfully!');
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleEditProject = async (index) => {
      setIsEditMode(true);
      setNewProject(projects[index]);
      setEditIndex(index);
    
      try {
        if (userEmail && projects.length > index) {
          const collectionRef = collection(database, 'basic_details');
          const querySnapshot = await getDocs(collectionRef);
    
          for (const docu of querySnapshot.docs) {
            if (docu.data().email === userEmail) {
              const documentId = docu.id;
              const userRef = doc(database, 'basic_details', documentId);
    
              const userDoc = await getDoc(userRef);
              if (userDoc.exists) {
                const userData = userDoc.data();
                const updatedProjects = [...userData.projects];
                updatedProjects[index] = newProject;
    
                await updateDoc(userRef, {
                  projects: updatedProjects,
                });
    
                setProjects(updatedProjects); // Update local state with updated projects
                console.log('Project updated successfully!');
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    
  
    const handleDeleteProject =async(index) => {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);

  
    try {
      if (userEmail) {
        const collectionRef = collection(database, "basic_details");
        const querySnapshot = await getDocs(collectionRef);
  
        for (const doc of querySnapshot.docs) {
          if (doc.data().email === userEmail) {
            const docRef = doc.ref;
            await updateDoc(docRef, { projects: updatedProjects });
            console.log("Exam removed successfully for email: ", userEmail);
            return; // Exit the loop after finding the matching email
          }
        }
      }
      console.log("Email not found in the database!");
    } catch (error) {
      console.log(error);
    }
    };
    
    return (
      <div className="projects-container" style={{backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      height: '100vh',
      opacity: 0.95,
      }}>
        <Navbar expand="lg" className="navbar sticky-top" variant="light"  collapseOnSelect style={{width:'100vw',marginTop:'0px'}}>
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="nav-button" href="/user">Back to Dashboard</Nav.Link>
            <Nav.Link className="nav-items" href="/profile">View Profile</Nav.Link>
            <Nav.Link className="nav-items" href="/skills">My Skillset</Nav.Link>
            <Nav.Link className="nav-items" href="/projects">My Projects</Nav.Link>
            <Nav.Link className="nav-items" href="/resume">View Resume</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <h1>Projects</h1>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Duration:</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="duration"
              value={newProject.duration}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="technologies">
            <Form.Label>Technologies Used:</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="technologies"
              value={newProject.technologies}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="outcomes">
            <Form.Label>Outcomes:</Form.Label>
            <Form.Control
              className="input-field"
              as="textarea"
              rows={4}
              name="outcomes"
              value={newProject.outcomes}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            className="add-button"
            variant="secondary"
            onClick={handleAddProject}
          >
            {isEditMode ? "Update Project" : "Add Project"}
          </Button>
        </Form>
        {projects && projects.map((project, index) => (
          project.title && <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>Duration: {project.duration}</p>
            <p>Technologies Used: {project.technologies}</p>
            <p>Outcomes: {project.outcomes}</p>
            <Button variant="secondary" onClick={() => handleEditProject(index)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDeleteProject(index)}>
              Delete
            </Button>
        </div>
        ))}
    </div>
  );
};

export default Projects;
