import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faTimes} style={{ color: 'red', fontSize: '24px' }} />

export default function Crud() {
    const [input,setInput]= useState({
        name: '', phone: '',email:'',password:''
    })

    const [record,setRecord] = useState([]);
    const [edit,setEdit] = useState("");

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setInput({
            ...input,[name]:value
        })
    }


    const handleSubmit = () =>{
        if(edit){
            let ans = record.map((item)=>{
                if(item.id == edit){
                    return{
                        ...item,
                        name: input.name,
                        phone: input.phone,
                        email: input.email,
                        password: input.password
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
                phone: phone,
                email:email,
                password:password
            }
            let data = [...record,obj];
            setRecord(data);
            localStorage.setItem('crud',JSON.stringify(data));
            alert("data succesfully inserted!");
        }
        setInput({
            name:'',phone: '',email:'',password:''
        })
    }

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
   <center>
       
        <table className="table-secondary my-5">
            <div className='table1'>
            <thead>
                <tr>
                     <td>name</td>
                     <td><input type="text" name='name' onChange={handleChange} value={input.name}/></td>
                </tr>
                <tr>
                     <td>email</td>
                     <td><input type="text" name='email' onChange={handleChange} value={input.email}/></td>
                </tr>
                <tr>
                     <td>phone</td>
                     <td><input type="text" name='phone' onChange={handleChange} value={input.phone}/></td>
                </tr>
                <tr>
                     <td>password</td>
                     <td><input type="password" name='password' onChange={handleChange} value={input.password}/></td>
                </tr>
             </thead>
             <tbody>
             <tr>
                     <td></td>
                     <td>{
                            (edit) ? (  <input type="button" value="Edit" onClick={()=>handleSubmit()} />)
                                    :(  <input type="button" value="submit" onClick={()=>handleSubmit()} />)
                        }
                        </td>
                </tr>
             </tbody>
            </div>
       </table>
    <br /><br />
      <div className="container">
      <table border={1}  className="table table-secondary table-striped">
       <thead>
       <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>password</th>
            <th>action</th>
        </tr>
       </thead>
       <tbody>
           {
            record.map((item)=>{
                const {name,phone,email,password,id} = item;
                    return(
                        <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{password}</td>
                        <td>
                            <button className='btn btn-danger ' onClick={()=>handleDelete(id)}> <FontAwesomeIcon icon={faTimes} /></button>
                            <button className='btn btn-primary mx-2' onClick={()=>handleEdit(id)}>edit</button>
                        </td>
                </tr>
                    )
            })
           }
       </tbody>
    </table>
      </div>
   </center>
  )
}
