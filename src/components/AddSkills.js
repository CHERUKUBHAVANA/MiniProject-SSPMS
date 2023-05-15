import React, { useState, useEffect } from "react";
import {  collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import '../css/navbar.css'
import img from '../assets/process_background.jpg'

function Skills() {
  const [inputList, setinputList] = useState([{ Skill: '' }]);
  const [skills, setSkills] = useState([])
  const [TinputList, setTinputList] = useState([{ TSkill: '', noOfModules: '', noOfModulesCompleted: '' }]);
  const [Tskills, setTSkills] = useState([])
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (userEmail) {
          const collectionRef = collection(database, "basic_details");
          const querySnapshot = await getDocs(collectionRef);

          for (const doc of querySnapshot.docs) {
            if (doc.data().email === userEmail) {
              const skillsData = doc.data().skills;
              setSkills(skillsData);
              const TskillsData = doc.data().Tskills;
              setTSkills(TskillsData);
              break;
            }
          }
        }
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchSkills();
  }, [userEmail]);
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);

  }

  const handleremove = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  }


  const handleTinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...TinputList];
    list[index][name]= value;
    setTinputList(list);
 
  }
  
  const handleTremove= index=>{
    const list=[...TinputList];
    list.splice(index,1);
    setTinputList(list);
  }
 
  const handleTSaveSkills = async () => {
    const extractedSkills = TinputList.map((item) => item.TSkill);
    console.log(extractedSkills)
    let updatedSkills = []
    Tskills ?  updatedSkills = [...Tskills, ...extractedSkills] : updatedSkills = [...extractedSkills]
    setTSkills(updatedSkills);
    try {
      if (userEmail) {
        const collectionRef = collection(database, "basic_details");
        const querySnapshot = await getDocs(collectionRef);
  
        for (const doc of querySnapshot.docs) {
          if (doc.data().email === userEmail) {
            const docRef = doc.ref;
            await updateDoc(docRef, { Tskills: updatedSkills });
            console.log("Skills updated successfully for email: ", userEmail);
  
            
            const snapshot = await getDoc(docRef);
            console.log(snapshot.data())
            const skillsData = snapshot.data().Tskills;
            console.log(skillsData)
            setTSkills(skillsData);
  
            return; 
          }
        }
      }
      console.log("Email not found in the database!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSkills = async () => {
    const extractedSkills = inputList.map((item) => item.Skill);
    let updatedSkills = []
    skills ?  updatedSkills = [...skills, ...extractedSkills] : updatedSkills = [...extractedSkills]
    setSkills(updatedSkills)
    try {
      if (userEmail) {
        const collectionRef = collection(database, "basic_details");
        const querySnapshot = await getDocs(collectionRef);

        for (const doc of querySnapshot.docs) {
          if (doc.data().email === userEmail) {
            const docRef = doc.ref;
            await updateDoc(docRef, { skills: updatedSkills });
            console.log("Skills updated successfully for email: ", userEmail);

           
            const snapshot = await getDoc(docRef);
            const skillsData = snapshot.data().skills;
            setSkills(skillsData);

            return; 
          }
        }
      }
      console.log("Email not found in the database!");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container" style={{backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    height: '100vh',
    opacity: 0.95,
    }}>
      <Navbar expand="lg" className="navbar sticky-top" variant="light" collapseOnSelect style={{width:'100vw',marginLeft:'0px'}}>
                <Container>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="nav-button" href="/user">Back to Dashboard</Nav.Link>
                            <Nav.Link className="nav-items" href="/profile">View Profile</Nav.Link>
                            <Nav.Link className="nav-items" href="/resume">View Resume</Nav.Link>
                            <Nav.Link className="nav-items" href="/projects">My Projects</Nav.Link>
                            <Nav.Link className="nav-items" href="/exams">Exam Schedules</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      <div className="row">
        <div className="col-sm-12">
          <h4 className="mt-3 mb-4 fw-bold">Soft Skills</h4>

          {
            inputList.map((x, i) => {
              return (
                <div className="row mb-3">
                  <div className="form-group col-md-4">
                    <label>Skill</label>
                    <input type="text" name="Skill" className="form-control" placeholder="Enter the Skill Name" onChange={e => handleinputchange(e, i)} />
                  </div>
                  <div className="form-group col-md-2 mt-4">
                    {
                      inputList.length !== 1 &&
                      <button className="btn btn-danger mx-1" onClick={() => handleremove(i)} style={{ marginBottom: 10 }}>Remove</button>
                    }
                    {/* {inputList.length - 1 === i &&
                      <button className="btn btn-success" onClick={handleaddclick}>Add More</button>
                    } */}
                    <button className="btn btn-primary" onClick={handleSaveSkills}>
            Save Skills
          </button>
                  </div>
                </div>
              );
            })}
          {/* <button className="btn btn-primary" onClick={handleSaveSkills}>
            Save Skills
          </button> */}
          <p>Saved Skills: {skills && skills.join(", ")}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
         <h4 className="mt-3 mb-4 fw-bold">Technical Skills</h4>
            
            { 
            TinputList.map( (x,i)=>{
              return(
              <div className="row mb-3">
                 <div className="form-group col-md-4">
                 <label>Skill</label>
                  <input type="text"  name="TSkill" className="form-control"  placeholder="Enter the Skill Name" onChange={ e=>handleTinputchange(e,i)} />
               </div>
               {/* <div className="form-group col-md-4"> */}
               {/* <label >NoOfModules</label>
                  <input type="text"  name="noOfModules" className="form-control"   placeholder="Enter the number of modules" onChange={ e=>handleTinputchange(e,i) }/> */}
               {/* </div> */}
                 {/* <div className="form-group col-md-4"> */}
                 {/* <label >NoOfModulesCompleted</label>
                  <input type="text"  name="noOfModulesCompleted" className="form-control"  placeholder="Enter the no Of modules completed" onChange={ e=>handleTinputchange(e,i)} /> */}
               {/* </div> */}
               <div className="form-group col-md-2 mt-4">
               {
                  TinputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={()=> handleTremove(i)} style={{marginBottom: 10}}>Remove</button>
               }
               {/* { TinputList.length-1===i &&
               <button  className="btn btn-success" onClick={ handleTaddclick}>Add More</button>
               } */}
               <button className="btn btn-primary" onClick={handleTSaveSkills}>
            Save Skills
          </button>
               </div>
            </div>
              );
             } )} 
            
          <p>Saved Skills: {Tskills && Tskills.join(", ")}</p>
                
       </div>
     </div>

    </div>

  );
}
export default Skills;