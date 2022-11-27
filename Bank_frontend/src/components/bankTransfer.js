import {Button, Form, Table} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

const BankTransfer = () => {
    const { register, handleSubmit} = useForm();
    const [transferHistory, setTransferHistory] = useState([])

    useEffect(()=> {
      try {
      const fetchData = async () =>{
        const result = await  axios.get('http://127.0.0.1:8080/api/money-transfer',
                                          { headers : { 'Content-Type': 'application/json'}});
        setTransferHistory(result.data)
        
      };   
      fetchData(); 
    } catch(error) {
        console.error(error.message);
     }
      
    },[transferHistory]);

    const onSubmit = data => {
      console.log(data)
      axios
       .post(
           'http://127.0.0.1:8080/api/money-transfer',
           data,
           { headers: { 'Content-Type': 'application/json' }}
        )
       .then(response => {
          console.log(response.data)
          document.getElementById("transferForm").reset();
       })
       .catch(err => { 
          console.log(err)
      });
   };

    return ( 
        <div style={{"width":"70%",margin:"auto"}}>
          <Form id="transferForm" onSubmit={handleSubmit(onSubmit)} style={{width:"40%",margin:"auto"}}>
            <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
              <b><label>Sender's RIB</label></b>
              <input required {...register("sender", {minLength: 1 })}  placeholder="sender's RIB" type="text" ></input>
            </div>
            <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
              <b><label>Receiver's RIB</label></b>
              <input required {...register("receiver", {minLength: 1 })}  placeholder="receiver's RIB" type="text" ></input>
            </div>
            <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
              <b><label style={{marginRight:"18%"}}>Amount</label></b>
              <input type="text" placeholder="amount" {...register("amount",)}></input>
            </div>
            <div className="text-center"> 
              <Button type="submit" variant="success">Add transaction</Button>
            </div>
          </Form>
          <hr></hr>
          <h4 className="text-center">banking transactions</h4>
          <hr></hr>
          <Table>
            <thead>
                <tr>
                    <th>ID</th> 
                    <th>Sender</th> 
                    <th>Receiver</th>
                    <th>Amount</th>
                  
                </tr>
            </thead>
             <tbody>
            { transferHistory && transferHistory.map((history)=> (
                 <tr  key={history.id}>
                    <td>{history.id}</td>
                    <td>{history.sender.client.name} {history.sender.client.lastName}</td>
                    <td>{history.receiver.client.name} {history.receiver.client.lastName}</td>
                    <td>{history.amount}</td>
                  
                 </tr>
                 )
            )}
            </tbody> 
            </Table>
        </div>
    );
}
 
export default BankTransfer;