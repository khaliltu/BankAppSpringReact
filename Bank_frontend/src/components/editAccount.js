import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
  
function EditAccounts(props,data) {
  const { register} = useForm();
  const [account,setAccount]=useState([]);

  useEffect (()=>{
    setAccount(props.data)
    },[account])

  const setValue = event => {
    event.target.value=event.target.placeholder
  }

  const updateValue =event =>{
    var filed = event.target.name
    account[filed]=event.target.value
    console.log(account)
  }

  const updateAccount =() =>{
    console.log(account)
    axios.put('http://127.0.0.1:8080/api/accounts',
    account,
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
            EditAccount
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
          <Row>
            <b><label>Name</label></b>
        <input disabled required {...register("name", {minLength: 3 })} value={account.client?account.client.name:""} type="text" onChange={updateValue} onFocus={setValue}></input>
       
            </Row>
            <Row>
            <b><label>Rib</label></b>
        <input disabled required {...register("rib", {minLength: 8 })} placeholder={account.rib} type="text" onChange={updateValue} onFocus={setValue}></input>
      
            </Row>
  
            <Row>
            <b><label>  Balance</label></b>
        <input required {...register("balance", {minLength: 3 })} placeholder={account.balance} type="text" onChange={updateValue} onFocus={setValue}>{data.cin}</input>
      
            </Row>
   
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={async() => {
                updateAccount()
                props.onHide()}}>Edit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  export default EditAccounts;