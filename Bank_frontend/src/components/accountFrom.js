import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
const AccountForm = () => {
  const { register, handleSubmit} = useForm();
  const [clients,setclients] = useState([])

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
 useEffect(()=> {
    try {
    const fetchData = async () =>{
      const result = await  axios.get('http://127.0.0.1:8080/api/clients/search',
                                        { headers : { 'Content-Type': 'application/json'}});
      setclients(result.data)
    };   
    fetchData(); 
  } catch(error) {
      console.error(error.message);
   }
    
  },[clients]);
    return ( 
    <Form id="userForm" onSubmit={handleSubmit(onSubmit)} style={{width:"80%",margin:"auto"}}>
            <div style={{flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label style={{marginRight:"15%"}}>Name</label></b>
      <input type="text"   placeholder="Name" ></input>
    </div>
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label style={{marginRight:"15%"}}>Rib</label></b>
      <input required {...register("cin", {minLength: 8 })} placeholder="CIN" type="text"></input>
      <b><label style={{marginRight:"15%"}}>  Balance</label></b>
      <input required {...register("address", {minLength: 3 })} placeholder="Address" type="text"></input>
    </div>

    <div> <Button type="submit" variant="success">Add Account</Button></div>
    </Form>
     );
}
 
export default AccountForm;