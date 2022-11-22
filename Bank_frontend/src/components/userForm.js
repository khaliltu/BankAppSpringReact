import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
const UserForm = () => {
  const { register, handleSubmit} = useForm();
  const onSubmit = data => {
    axios
     .post(
         'http://127.0.0.1:8080/api/v1/students',
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
    <div style={{display:"flex",flexWrap:"nowrap",justifyContent:"space-between",}}>
      <b><label>Name</label></b>
      <input required {...register("name", {minLength: 3 })} placeholder="Enter Name" type="text"></input>
      <b><label>Last Name</label></b>
      <input required {...register("lastName", {minLength: 3 })} placeholder="Last Name" type="text"></input>
      <Button type="submit" variant="success">Add Student</Button>
    </div>
    </Form>
     );
}
 
export default UserForm;