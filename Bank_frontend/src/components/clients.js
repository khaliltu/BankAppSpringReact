import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import UserForm from "./userForm";
import EditClient from "./editClient";
import DeleteModal from "./deleteModal";
const Clients = () => {
    const [modaldata, setmodaldata] = useState();
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [cin, setCin] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [name, setName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [clients,setclients] = useState()

    const hideConfirmationModal = () => {
      setDisplayConfirmationModal(false);
    };
    const showDeleteModal = (cin,name,lastName) => {
      setName(name)
      setLastName(lastName)
      setCin(cin)
      setDeleteMessage('Are you sure you want to delete the client '+ name +' ' +lastName ) 
      setDisplayConfirmationModal(true);
    };
    const showModal = (record) => {
        setmodaldata(record);
        setModalShow(true)
      };
        useEffect(()=> {
        try {
        const fetchData = async () =>{
          const result = await  axios.get('http://127.0.0.1:8080/api/clients/',
                                            { headers : { 'Content-Type': 'application/json'}});
          setclients(result.data)
          
        };   
        fetchData(); 
      } catch(error) {
          console.error(error.message);
       }
        
      },[clients]);

      const deleteClient= (cin)=>{
        console.log(cin)
        axios.delete(`http://127.0.0.1:8080/api/clients/delete/${cin}`,
        cin,
          { headers : { 'Content-Type': 'application/json'}})
        .then(response=>{
          console.log(response.data) 
          setDisplayConfirmationModal(false);
        })
        .catch( console.log("erreur"))
       };

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
                    <td><Button variant="danger" onClick={async() =>showDeleteModal(client.cin,client.name,client.lastName)} >Delete</Button></td>
                 </tr>
                 )
            )}
            </tbody>
            </Table>
            {modalShow &&<EditClient data={modaldata} show={modalShow} onHide={() => setModalShow(false)}/>}
            <DeleteModal showModal={displayConfirmationModal} confirmModal={deleteClient} hideModal={hideConfirmationModal}  cin={cin} message={deleteMessage}  />

        </div>
    );
}
 
export default Clients;