import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import UserForm from "./userForm";
const Clients = () => {
    const [clients,setclients] = useState([])
    useEffect(()=> {
        try {
        const fetchData = async () =>{
          const result = await  axios.get('http://127.0.0.1:8080/api/clients',
                                            { headers : { 'Content-Type': 'application/json'}});
          setclients(result.data)
        };   
        fetchData(); 
      } catch(error) {
          console.error(error.message);
       }
        
      },[clients]);
      
    return ( 
        <div style={{"width":"80%",margin:"auto"}}>
            <UserForm></UserForm>
            <hr></hr>
            <h4 className="text-center">clients List</h4>
            <hr></hr>
            <Table>
            <thead>
                <tr>
                    <th>CIN</th>
                    <th>Name</th>
                    <th>lastName</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {clients && clients.map((client)=> (
                 <tr>
                    <td>{client.cin}</td>
                    <td>{client.name}</td>
                    <td>{client.lastName}</td>
                    <td>{client.address}</td>
                    <td><Button>Edit</Button></td>
                    <td><Button variant="danger">Delete</Button></td>
                 </tr>
                 )
            )}
            </tbody>
            </Table>
        </div>
    );
}
 
export default Clients;