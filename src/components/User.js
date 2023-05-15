import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/dashboard.css'; // Import custom CSS file for additional styling
import img from '../assets/user.jpg'
import bimg from '../assets/background.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
const User = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const userEmail = location.state && location.state.userEmail
  const userEmail = localStorage.getItem('userEmail')

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAddExamClick = () => {
    navigate('/exams');
  };
  const handleResumeClick = () => {
    navigate('/resume')
  }
  const handleProjectsClick = () => {
    navigate('/projects')
  }
  
  const handleSoftSkillsClick = () => {
    navigate('/skills')
  }

  return (
    <div style={{
      backgroundImage: `url(${bimg})`,
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
      
      <Container className="dashboard-container">
        <Row className="user-symbol-row">
          <Col className="text-center">
            <img src={img} alt="User Symbol" title={userEmail} className="user-symbol" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button" onClick={handleProfileClick}>My Profile</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button" onClick={handleResumeClick}>View Resume</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button"  onClick={handleAddExamClick}>Exam Schedules</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button" onClick={handleSoftSkillsClick}>Skill Set</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button" onClick={handleProjectsClick}>My Projects</Button>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Button block variant="secondary" className="dashboard-button" onClick={handleAchievementsClick}>Achievements</Button>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default User;
