import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import DeleteMyRecord from './components/DeleteMyRecord';
import UpdatePassword from './components/UpdatePassword';

function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home'  element={<Home/>}/>
    <Route path='/deletemyrecord' element={<DeleteMyRecord />}/>
    <Route path='/resetpassword' element={<UpdatePassword/>}/>
    </Routes>
    </Router>
  );
}

export default App;
