import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
const UserForm = () => {
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
    <Form id="userForm" onSubmit={handleSubmit(onSubmit)} style={{width:"80%",margin:"auto"}}>
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label>CIN</label></b>
      <input required {...register("cin", {minLength: 8 })} placeholder="CIN" type="text"></input>
      <b><label>  Address</label></b>
      <input required {...register("address", {minLength: 3 })} placeholder="Address" type="text"></input>
    </div>
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",marginBottom:"15px",}}>
      <b><label>Name</label></b>
      <input required {...register("name", {minLength: 3 })} placeholder=" Name" type="text"></input>
      <b><label>Last Name</label></b>
      <input required {...register("lastName", {minLength: 3 })} placeholder="Last Name" type="text"></input>
    </div>
    <div> <Button type="submit" variant="success">Add Student</Button></div>
    </Form>
     );
}
 
export default UserForm;