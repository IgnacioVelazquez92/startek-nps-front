import React from 'react'

const NPSActual = ({nps, promotores, detractores , neutros}) => {

  
  return (
    <div className='d-flex justify-evenly align-items-center row'>
      <div className='bg-primary text-light col-lg-3 col-12 col-md-6'>
        <h1>{nps}</h1>
      </div>

      <div className='bg-success text-light col-lg-3 col-12 col-md-6'>
        <h1>{promotores}</h1>
      </div>

      <div className='bg-warning text-light col-lg-3 col-12 col-md-6'>
        <h1>{detractores}</h1>
      </div>

      <div className='bg-danger text-light col-lg-3 col-12 col-md-6'>
        <h1>{neutros}</h1>
      </div>

    </div>
  )
}

export default NPSActual