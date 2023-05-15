import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Career from './components/Career';
import Profile from './components/Profile';
import Resume from './components/Resume';
import LMS from './components/LMS';
import User from './components/User';
import Projects from './components/Projects';
import Exam from './components/AddExam';
import Skills from './components/AddSkills';
function App() {
  return (
    <BrowserRouter fluid>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/career" element={<Career />} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/lms" element={<LMS />} />
        <Route path="/user" element={<User/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/exams" element={<Exam/>}/>
        <Route path="/skills" element={<Skills/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;