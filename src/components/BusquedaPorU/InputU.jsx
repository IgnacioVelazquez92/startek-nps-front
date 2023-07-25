import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ApiClient } from '../../api/services';
import TablaDatos from './TablaPorU';
import Loader from '../Loader/Loader';




const InputUsuarioU = () => {
  const apiClient = new ApiClient();
  const [usuarioU , setUsuarioU] = useState("")
  const [encuestas, setEncuestas] = useState("");

  const handleChange = (e)=>{
    setUsuarioU(e.target.value.toUpperCase())
    console.log(e.target.value.toUpperCase());
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  try {
    const response = await apiClient.getNpsbyU(usuarioU);
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
      <Form.Control size="lg" type="text" placeholder="Ingresa tu usuario" name="user" id="user" onChange={handleChange} />
      <br />
      <Button variant="primary" type='submit'>Buscar</Button>
      </Form>
      {
        encuestas?(<TablaDatos encuestas={encuestas}/>):<Loader />
      }
    </>
  
  )
}

export default InputUsuarioU
