import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import UserForm from "./userForm";
import EditClient from "./editClient";
import { useLocation } from "react-router-dom";
const Clients = () => {
    const [modaldata, setmodaldata] = useState();
    const [cin, setcin] = useState("");

    const [clients,setclients] = useState()
    const showModal = (record) => {
        
           
        setmodaldata(record);
        setModalShow(true)

      };
      const [modalShow, setModalShow] = useState(false);
      useEffect(() => {
        
      }, [])
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

      /* const deleteClient= ()=>{
        try { axios.delete('http://127.0.0.1:8080/api/clients')}

          catch(error) {
          console.error(error.message);
       }
      };

      useEffect(() => {
        deleteClient();
           }, []); */
      
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
                 <tr  key={client.cin}   
                        
               >
                    <td>{client.cin}</td>
                    <td>{client.name}</td>
                    <td>{client.lastName}</td>
                    <td>{client.address}</td>
                    <td><Button  onClick={() => showModal(client)}  >Edit</Button></td>
                    <td><Button variant="danger" /* onSubmit={deleteClient()} */>Delete</Button></td>
                 </tr>
                 )
            )}
            </tbody>
            </Table>
            {modalShow &&<EditClient data={modaldata} show={modalShow} onHide={() => setModalShow(false)}/>}
        </div>
    );
}
 
export default Clients;