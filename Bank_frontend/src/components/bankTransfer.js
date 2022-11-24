import {Button, Form, Table} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const BankTransfer = () => {
    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
      axios
       .post(
           'http://127.0.0.1:8080/api/clients/',
           data,
           { headers: { 'Content-Type': 'application/json' }}
        )
       .then(response => {
          console.log(response.data)
          document.getElementById("userForm").reset();
       })
       .catch(err => { 
          console.log(err)
      });
   };
    return ( 
        <div style={{"width":"80%",margin:"auto"}}>
          <Form id="userForm" onSubmit={handleSubmit(onSubmit)} style={{width:"80%",margin:"auto"}}>
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label>Sender's RIB</label></b>
      <input required {...register("rib", {minLength: 8 })} placeholder="RIB" type="text"></input>
      <b><label> Receiver's RIB</label></b>
      <input required {...register("rib", {minLength: 3 })} placeholder="RIB" type="text"></input>
    </div>
    <div style={{flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label style={{marginRight:"18%"}}>Amount</label></b>
      <input type="text"   placeholder="amount" ></input>
    </div>
    <div> <Button type="submit" variant="success">Add transaction</Button></div>
    </Form>
            <hr></hr>
            <h4 className="text-center">banking transactions</h4>
            <hr></hr>
            <Table>
            <thead>
                <tr>
                    <th>Sender's RIB</th>
                    <th>Receiver's RIB</th>
                    <th>Amount</th>
                  
                </tr>
            </thead>
{/*              <tbody>
            {clients && clients.map((client)=> (
                 <tr  key={client.cin}   
                        
               >
                    <td>{client.cin}</td>
                    <td>{client.name}</td>
                    <td>{client.lastName}</td>
                  
                 </tr>
                 )
            )}
            </tbody> */}
            </Table>

        </div>
    );
}
 
export default BankTransfer;