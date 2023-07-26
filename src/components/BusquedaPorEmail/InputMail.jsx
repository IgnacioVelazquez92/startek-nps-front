import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ApiClient } from '../../api/services';
import TablaDatos from './TablaDatos';
import Loader from '../Loader/Loader';
import DatePicker from 'react-datepicker'




const InputMail = () => {
  const apiClient = new ApiClient();
  const [email , setEmail] = useState("")
  const [encuestas, setEncuestas] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e)=>{
    setEmail(e.target.value.toUpperCase())
    console.log(e.target.value.toUpperCase());
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  setLoading(true);
  try {
    const response = await apiClient.getNpsbyEmail(email);
    if (response) {
      setEncuestas(response.data)
    }else {
      setEncuestas([]);
    }
  } catch (error) {
    console.log(error);
  }finally {
    setLoading(false);
  }
}

  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <Form.Control size="lg" type="email" placeholder="Introduce el email" name="email" id="email" onChange={handleChange} />
      
        <Button variant="primary" type='submit' className='ms-2'>Buscar</Button>
      </Form>
      {loading ? (
        <Loader className="mx-auto"/>
      ) : encuestas.length > 0 ? (
        <TablaDatos encuestas={encuestas} />
      ) : null}
    </>
  
  )
}

export default InputMail
