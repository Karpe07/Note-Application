import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import React, { useState } from 'react';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home  showAlert={showAlert} />} ></Route>
              <Route exact path="/About" element={<About />} ></Route>             
              <Route exact path="/Login" element={<Login showAlert={showAlert} />} ></Route>             
              <Route exact path="/SignUp" element={<SignUp showAlert={showAlert} />} ></Route>             
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
