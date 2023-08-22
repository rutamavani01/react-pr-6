import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export default function Crud() {

  const [showModal, setShowModal] = useState(false);
  const [record, setRecord] = useState([]);
  const [edit,setEdit] = useState("");
  const [input, setInput] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if(edit){
      let ans = record.map((item)=>{
          if(item.id == edit){
              return{
                  ...item,
                  name: input.name,
                  phone: input.phone,
                  email: input.email,
                  phone: input.phone
              }
          }
          return item;
      })
      setRecord(ans);
      setEdit("");
  }else{
      const {name,phone,email,password} = input;
    
      let obj = {
          id: Math.floor(Math.random() * 1000),
          name: name,
          email: email,
          phone: phone,
          password: password
      }
      let data = [...record,obj];
      setRecord(data);
      localStorage.setItem('crud',JSON.stringify(data));
      alert("data succesfully inserted!");
  }
  setInput({
      name:'',phone: '',email: '', password: ''
  })
    closeModal();
  };

  const handleDelete = (id) =>{
    let ans = record.filter((item)=>{
        return item.id !== id;
    })
    setRecord(ans);
    localStorage.setItem('crud',JSON.stringify(ans));
    alert("succesfully data deleted!")
}
const handleEdit = (id) =>{
    let ans = record.filter((item)=>{
        return item.id === id;
    })
    setInput(ans[0]);
    setEdit(id);
}

useEffect(()=>{
  let allrecord = JSON.parse(localStorage.getItem('crud'));
  if(allrecord === null){
      setRecord([]);
  }else{
      setRecord(allrecord);
  }
},[])

  return (

    <div className="crud-container">
        <div className="container">
          <div className="row">
          <div className="col-6">
            <h3 className='my-5'> Add more data</h3>
          </div>
          <div className="col-6">
          <Button variant="primary" className='my-5' onClick={openModal}>
           Add More
          </Button>
          </div>
          </div>
        </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>phone</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {record.map((data, index,id) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td>{data.phone}</td>
              <td>
              <button onClick={()=>handleDelete(id)}>delete</button>
                            <button onClick={()=>handleEdit(id)}>edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
       
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={input.phone}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
