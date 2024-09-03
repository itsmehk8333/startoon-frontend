import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import Homepage from '../Components/Homepage'

function RoutesComponent() {
  return (
    <Routes>
       <Route path='/dashboard' element={<Homepage />  }></Route>
      <Route path='/login' element={<SignIn />  }></Route>
      <Route path='/register' element={<SignUp />  }></Route>
      <Route path='*' element={<Navigate  to="/dashboard" replace={true}  />} > </Route>

    </Routes>
  )
}

export default RoutesComponent