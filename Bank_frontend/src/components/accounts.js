import { useState,useEffect } from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import AccountForm from "./accountFrom";
import EditAccounts from "./editAccount";
const Accounts = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modaldata, setmodaldata] = useState([]);

    const [accounts,setaccounts] = useState([])
    const showModal = (record) => {
        setmodaldata(record);
        setModalShow(true)
       
      };
      const [modalShow, setModalShow] = useState(false);

    useEffect(()=> {
        try {
        const fetchData = async () =>{
          const result = await  axios.get('http://127.0.0.1:8080/api/accounts',
                                            { headers : { 'Content-Type': 'application/json'}});
          setaccounts(result.data)
        };   
        fetchData(); 
      } catch(error) {
          console.error(error.message);
       }
        
      },[accounts]);


      
    return ( 
        <div style={{"width":"80%",margin:"auto"}}>
            <AccountForm></AccountForm>
            <hr></hr>
            <h4 className="text-center">accounts List</h4>
            <hr></hr>
            <Table>
            <thead>
                <tr>
                    <th>Rib</th>
                    <th>Balance</th>
                    <th>Client Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {accounts && accounts.map((account)=> (
                 <tr  key={account.rib}   
                        
               >
                    <td>{account.rib}</td>
                    <td>{account.balance}</td>
                    <td>{account.client.cin}</td>
                    <td><Button  onClick={() => showModal(account)}  >Edit</Button></td>
                    <td><Button variant="danger" /* onSubmit={deleteClient()} */>Delete</Button></td>
                 </tr>
                 )
            )}
            </tbody>
            </Table>
            {modalShow &&<EditAccounts data={modaldata} show={modalShow} onHide={() => setModalShow(false)}/>}
        </div>
    );
}
 
export default Accounts;