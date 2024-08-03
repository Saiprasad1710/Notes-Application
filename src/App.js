import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

import Login from "./components/Login";
import Signup from "./components/Signup";
// import Alerts from "./components/Alerts";
// import { useState } from "react";

function App() {

  // const [alert,setalert] = useState(null);
  // const showAlert = (message,type)=>{
  //   setalert({
  //     msg:message,
  //     type:type

  //   })
  //   setTimeout (()=>{
  //     setalert(null);

  //   },1200)

  // }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        {/* <Alerts alert={alert}/> */}
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;


{/* <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
        </Routes> */}