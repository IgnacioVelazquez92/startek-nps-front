import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ApiClient } from '../../api/services';
import TablaDatos from './TablaDatos';
import Loader from '../Loader/Loader';




const InputMail = () => {
  const apiClient = new ApiClient();
  const [email , setEmail] = useState("")
  const [encuestas, setEncuestas] = useState("");

  const handleChange = (e)=>{
    setEmail(e.target.value.toUpperCase())
    console.log(e.target.value.toUpperCase());
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    const response = await apiClient.getNpsbyEmail(email);
    if (response) {
      setEncuestas(response.data)
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Form.Control size="lg" type="email" placeholder="Introduce el email" name="email" id="email" onChange={handleChange} />
      <br />
      <Button variant="primary" type='submit'>Buscar</Button>
      </Form>
      {
        encuestas?(<TablaDatos encuestas={encuestas}/>):<Loader />
      }
    </>
  
  )
}

export default InputMail
