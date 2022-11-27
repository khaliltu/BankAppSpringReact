import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
const AccountForm = () => {
  const { register, handleSubmit} = useForm();
  const [client,setClient]=useState()
  const [clients,setClients]=useState([])
  const[prefix,setPrefix]=useState()
  const [balance, setBalance] = useState()
  const onSubmit = () => {
    var result = clients.filter(obj => {
      return obj.cin === client
    })
    result=result[0]
    axios
     .post(
         'http://127.0.0.1:8080/api/accounts/',
         {"balance":balance,"client":result},
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
  const updateSelection = async (event) => {
      setClient(event.target.value)
  }
  const updateBalance = event => {
    setBalance(event.target.value)
  }
  const updateValue = event =>{
    try {
      setPrefix(event.target.value)
      const fetchData = async () =>{
        const result = await  axios.get(`http://127.0.0.1:8080/api/clients/search?prefix=${prefix}`,
        { headers : { 'Content-Type': 'application/json'}});
        setClients(result.data)
      };   
      fetchData(); 
    } catch(error) {
        console.error(error.message);
     }
  } 
    return ( 
    <Form id="userForm" onSubmit={handleSubmit(onSubmit)} style={{width:"80%",margin:"auto"}}>
      <div style={{ display:"flex", flexWrap:"nowrap", flexDirection:"row",justifyContent:"space-evenly",marginBottom:"15px",}}>
        <div style={{width:"40%"}}>
          <b><label style={{marginRight:"15%"}}>Name</label></b>
          <div>
            <input id="clientI" style={{width:"300px"}} placeholder="Name" onChange={updateValue}></input>
            {prefix && <select style={{width:"300px", padding:"0px",
                        "-webkit-appearance": "none"}}
                        name="client" onChange={updateSelection} >
                          <option selected>--Choose One Client--</option> {clients.map((client) => (
                          <option value={client.cin}>{client.name} {client.lastName} </option>
                      ))}
            </select> }
          </div>
        </div>
        <div style={{maxWidth:"50%"}}>
          <b><label style={{marginRight:"15%"}}>  Balance</label></b>
          <input required {...register("balance", {minLength: 2 })} onChange={updateBalance}  placeholder="Balance" type="text" ></input>
        </div>
        <div>
          <b><label style={{marginRight:"15%", color:"white"}}>  Balance</label></b>
          <div className="text-center"> <Button type="submit" variant="success">Add Account</Button></div>
        </div>
    </div>
    <br></br>
    </Form>
     );
}
 
export default AccountForm;