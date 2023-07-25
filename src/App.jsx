import { createBrowserRouter, RouterProvider, createRoutesFromElements,Route } from "react-router-dom";
import {routes} from './Routes/routes'


import RootLayout from './Layout/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>
      {
        routes.map(({path, Element, index})=>(
          <Route key={path} path={path} element ={<Element/>} />
        ))
      }
    </Route>
  )
)

function App() {

  return (
    <>
      
      <RouterProvider router={router}/>
    
    </>
  )
}

export default App
