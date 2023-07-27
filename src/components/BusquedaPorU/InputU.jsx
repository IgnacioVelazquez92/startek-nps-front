import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ApiClient } from '../../api/services';
import TablaPorU from './TablaPorU';
import Loader from '../Loader/Loader';




const InputUsuarioU = () => {
  const apiClient = new ApiClient();
  const [usuarioU , setUsuarioU] = useState("")
  const [encuestas, setEncuestas] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    setUsuarioU(e.target.value.toUpperCase())
    console.log(e.target.value.toUpperCase());
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  setLoading(true);
  try {
    const response = await apiClient.getNpsbyU(usuarioU);
    if (response) {
      setEncuestas(response.data)
    }
    else {
      setEncuestas([]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <Form.Control size="lg" type="text" placeholder="Ingresa tu usuario" name="user" id="user" onChange={handleChange} />
        <Button variant="primary" type='submit' className='ms-2'>Buscar</Button>
      </Form>
      {loading ? (
        <Loader className="mx-auto"/>
      ) : encuestas.length > 1 ? (
        <TablaPorU encuestas={encuestas} />
      ) : <p className='text-center my-2'>No se encotraron registros</p> }
    </>
  
  )
}

export default InputUsuarioU
