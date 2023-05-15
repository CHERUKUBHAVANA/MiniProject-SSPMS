import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/background.jpg';
import '../css/home.css'

const Home = () => {
  return (
    <div>
      <div style={{
        backgroundImage: `url(${img})`,
        backgroundSize: '100% 100%  ',
        height: '100vh',
        opacity: 1.0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <div style={{
          color: 'white',
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 className='sspms' style={{ fontSize: '3rem', marginBottom: '1rem' }}>Student Skill Progress and Management</h1>
          <p style={{ fontSize: '1.5rem' }}>Welcome to our website! Our platform is designed to help students manage their skills, track their progress,
            and prepare for their future careers. With our user-friendly registration and login system, you'll be able
            to create your own profile, build a dynamic resume, and use our LMS tool to stay on top of your upcoming
            exams. Start exploring and take control of your learning journey today!
          </p>

          <Link to="/Register">
            <button className='register-button'>Get Registered</button>
          </Link>
          <Link to='/login'>
            <button className='login-button'>Login</button>
          </Link>
        </div>
      </div>
      
     </div>
  )
}

export default Home;
