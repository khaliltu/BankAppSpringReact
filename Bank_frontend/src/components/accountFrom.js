import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
const AccountForm = () => {
  const { register, handleSubmit} = useForm();
  const [account,setAccount] = useState([])
  const [cin,setCin]=useState([])
  const [client,setClient]=useState([])
  const [clients,setClients]=useState([])
  const[prefix,setPrefix]=useState([])
  const [cl,setCl]=useState([])
  const onSubmit = data => {
    axios
     .post(
         'http://127.0.0.1:8080/api/accounts/',
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
 const setValue = event => {
  event.target.value=event.target.placeholder
}
  const updatePrefix =event =>{
 
 // console.log(clients)
}

  const updateValue = event =>{
    try {
      setPrefix(event.target.value)
      console.log(prefix)
      const fetchData = async () =>{
        const result = await  axios.get(`http://127.0.0.1:8080/api/clients/search?prefix=${prefix}`,
        { headers : { 'Content-Type': 'application/json'}});
        setClients(result.data)
        console.log(clients)

      };   
      fetchData(); 
    } catch(error) {
        console.error(error.message);
     }
  }


const choseClient=()=>{
  console.log(client.cin)
  setCin(client.cin)
  axios.get(`http://127.0.0.1:8080/api/clients/${cin}`,
    { headers : { 'Content-Type': 'application/json'}})
  .then(response=>{
    console.log(response.data) 
    setCl(response.data)
    console.log(cl)
  })}
 
    
    return ( 
    <Form id="userForm" onSubmit={handleSubmit(onSubmit)} style={{width:"80%",margin:"auto"}}>
            <div style={{flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label style={{marginRight:"15%"}}>Name</label></b>
      <input style={{width:"300px"}}   placeholder="Name" required {...register("name", {minLength: 8 })} onChange={updateValue}></input>
      {prefix && clients&& clients.map((client)=> (
      <ul  role="listbox">
      <li role="presentation" style={{marginLeft:"20%"}}  key={client.cin} > 
      <a onClick={async()=>choseClient()} class="dropdown-item" href="#">{client.name} {client.lastName} | cin : {client.cin}</a>
      </li>

      </ul>

      ))}

    </div>
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label style={{marginRight:"15%"}}>Rib</label></b>
      <input required {...register("rib", {minLength: 8 })} placeholder="RIB" type="text" ></input>
      <b><label style={{marginRight:"15%"}}>  Balance</label></b>
      <input required {...register("balance", {minLength: 3 })}  placeholder="Balance" type="text" ></input>
    </div>

    <div> <Button type="submit" variant="success">Add Account</Button></div>
    </Form>
     );
}
 
export default AccountForm;