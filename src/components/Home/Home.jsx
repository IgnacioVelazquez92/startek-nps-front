import React from 'react'
// import BarChart from '../Charts/BarChart'
import CalculoNPS from '../Charts/CalculoNPS'
import StartekNPS from '../Home/StartekNPS'

const Home = () => {
  return (

    <>
      <div>Home</div>
      <StartekNPS />
      {/* <BarChart /> */}
      <CalculoNPS />
    </>
  )
}

export default Home