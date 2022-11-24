
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

function EditClient(props,setModalShow) {
    const { register} = useForm();
    const [client,setClient]=useState([]);
    useEffect (()=>{
      console.log("aaa")

    setClient(props.data)
    console.log(client.cin)
    },[client])
const setValue = event => {
  event.target.value=event.target.placeholder
}
const updateValue =event =>{
  var filed = event.target.name
  client[filed]=event.target.value
  console.log(client)
}
const updateClient =() =>{
  console.log(client)
  axios.put('http://127.0.0.1:8080/api/clients',
  client,
  { headers : { 'Content-Type': 'application/json'}})
  .then(response=>{
    console.log(response.data)
  }
  ).catch(
    console.log("erreur")
    )
}

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
    <Form id="userForm" style={{width:"80%",margin:"auto"}}>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
          <b><label>CIN</label></b>
      <input required {...register("cin", {minLength: 8 })} onChange={updateValue} onFocus={setValue} placeholder={client.cin} type="text"></input>
    
          </Row>

          <Row>
          <b><label>  Address</label></b>
      <input required {...register("address", {minLength: 3 })} onChange={updateValue} onFocus={setValue} placeholder={client.address} type="text"></input>
    
          </Row>
          <Row>
          <b><label>Name</label></b>
      <input required {...register("name", {minLength: 3 })} onChange={updateValue} onFocus={setValue}  placeholder={client.name} type="text">{}</input>
     
          </Row>
          <Row>
          <b><label>Last Name</label></b>
      <input required {...register("lastName", {minLength: 3 })} onChange={updateValue} onFocus={setValue}  placeholder={client.lastName} type="text"></input>
  
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={async() => {
                updateClient()
                props.onHide()}}>Edit</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default EditClient;