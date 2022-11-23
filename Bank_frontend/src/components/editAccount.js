

  import React, { useState } from 'react';
  import Col from 'react-bootstrap/Col';
  import Container from 'react-bootstrap/Container';
  import Modal from 'react-bootstrap/Modal';
  import Row from 'react-bootstrap/Row';
  import { useForm } from "react-hook-form";
  import { Form, Button } from "react-bootstrap";
  
  function EditAccounts(props,data) {
      const { register, handleSubmit} = useForm();
  
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
        <input required {...register("name", {minLength: 3 })} placeholder=" Name" type="text">{data.cin}</input>
       
            </Row>
            <Row>
            <b><label>Rib</label></b>
        <input required {...register("cin", {minLength: 8 })} placeholder="Rib" type="text"></input>
      
            </Row>
  
            <Row>
            <b><label>  Balance</label></b>
        <input required {...register("address", {minLength: 3 })} placeholder="Balance" type="text">{data.cin}</input>
      
            </Row>
   
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onHide}>Edit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  export default EditAccounts;