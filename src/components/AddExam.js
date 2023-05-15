import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import '../css/time.css'
import { Link } from "react-router-dom";
import '../css/navbar.css';
import img from '../assets/process_background.jpg'
import { Navbar,Nav, Container, Button } from "react-bootstrap";
function Exam() {
  const [inputList, setinputList] = useState([{ examName: '', examDate: '' }]);
  const [exams, setExams] = useState([])
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchExams = async () => {
      try {
        if (userEmail) {
          const collectionRef = collection(database, "basic_details");
          const querySnapshot = await getDocs(collectionRef);

          for (const doc of querySnapshot.docs) {
            if (doc.data().email === userEmail) {
              const examsData = doc.data().exams || [];;
              setExams(examsData);
              break;
            }
          }
        }
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchExams();
  }, [userEmail]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updatedExams = exams.map((exam) => {
        const examTime = new Date(exam.examDate).getTime();
        const distance = examTime - now;
  
        if (distance <= 0) {
          return {
            ...exam,
            remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 }
          };
        }
  
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        return {
          ...exam,
          remainingTime: { days, hours, minutes, seconds }
        };
      });
  
      setExams(updatedExams);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [exams]);
  



  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);

  }

  const handleRemove = async (index) => {
    const list = [...inputList];
    const removedExam = list.splice(index, 1);
    setinputList(list);
    const updatedExams = [...exams];
    updatedExams.splice(index, 1);
    setExams(updatedExams);

  
    try {
      if (userEmail) {
        const collectionRef = collection(database, "basic_details");
        const querySnapshot = await getDocs(collectionRef);
  
        for (const doc of querySnapshot.docs) {
          if (doc.data().email === userEmail) {
            const docRef = doc.ref;
            await updateDoc(docRef, { exams: updatedExams });
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
  

  

  const handleaddclick = async () => {
    const extractedExams = inputList.map((item) => item);
    console.log(extractedExams)
    let updatedExams = []
    exams ? updatedExams = [...exams, ...extractedExams] : updatedExams = [...extractedExams]
    setExams(updatedExams);
    // setinputList([...inputList, { examName: '', examDate: '' }]);  
    try {
      if (userEmail) {
        const collectionRef = collection(database, "basic_details");
        const querySnapshot = await getDocs(collectionRef);

        for (const doc of querySnapshot.docs) {
          if (doc.data().email === userEmail) {
            const docRef = doc.ref;
            await updateDoc(docRef, { exams: updatedExams });
            console.log("Skills updated successfully for email: ", userEmail);


            const snapshot = await getDoc(docRef);
            // console.log(snapshot.data())
            const examsData = snapshot.data().exams;
            // console.log(examsData)
            setExams(examsData);

            return;
          }
        }
      }
      console.log("Email not found in the database!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    height: '100vh',
    opacity: 0.95,
    }}>
    <Navbar expand="lg" className="navbar sticky-top" variant="light" collapseOnSelect>
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
    <div className="container">
      
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">Set Your Exam Name and Date</h5>

          {
            inputList.map((x, i) => {
              return (
                <div className="row mb-3">
                  <div className="form-group col-md-4">
                    <label >Exam Name</label>
                    <input type="text" name="examName" className="form-control" placeholder="Enter Exam" onChange={e => handleinputchange(e, i)} />
                  </div>
                  <div className="form-group col-md-4">
                    <label >Exam Date</label>
                    <input type="date" name="examDate" className="form-control" placeholder="Enter Date" onChange={e => handleinputchange(e, i)} />
                  </div>
                  <div className="form-group col-md-2 mt-4">
                    {
                      inputList.length !== 1 &&
                      <button className="btn btn-danger mx-1" onClick={() => handleRemove(i)} style={{ marginBottom: 10 }}>Remove</button>
                    }
                    {inputList.length - 1 === i &&
                      <button className="btn btn-success" onClick={handleaddclick}>Add More</button>
                    }
                  </div>
                </div>
              );
            })}
          {exams && exams.map((exam, index) => (
  <p key={index} className="exam">
    <strong>Exam: </strong>{exam.examName}<br/>
    <strong>Exam Date: </strong>{exam.examDate} <br/>
    <strong className="time">
      {exam.remainingTime && (
        `${exam.remainingTime.days} days ${exam.remainingTime.hours} : ${exam.remainingTime.minutes} : ${exam.remainingTime.seconds}`
      )}
    </strong><br/><br/>
    <button className="btn btn-danger mx-1" onClick={() => handleRemove(index)} style={{ marginBottom: 10 }}>
      Remove
    </button>
  </p>
))}



        </div>
      </div>

    </div>
    </div>
  );
}
export default Exam;