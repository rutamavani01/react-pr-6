import logo from './logo.svg';
import './App.css';
import Crud from './Components/Crud';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import './Components/style.css';
function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
      <center>
         <h1>Crud Operation</h1>
        <br /><br />
        <button onClick={() => { setOpenModal(true) }} className='btn btn-secondary'>Add Employee</button>
      {openModal && <Crud closeModal={() => setOpenModal(false)} />}
      
      </center>
  );
}
export default App;