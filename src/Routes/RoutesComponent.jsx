import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import Homepage from '../Components/Homepage'


const ProtectedRoute = ({ element, redirectTo, ...rest }) => {
  const token = sessionStorage.getItem('token');
  return token ? element : <Navigate to={redirectTo} replace />;
};


const RedirectIfAuthenticated = ({ element }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to="/dashboard" replace /> : element;
};

function RoutesComponent() {

  const token = sessionStorage.getItem('token');
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Homepage />} redirectTo="/login" />}
      />
      <Route
        path="/login"
        element={<RedirectIfAuthenticated element={<SignIn />} />}
      />
      <Route
        path="/register"
        element={<RedirectIfAuthenticated element={<SignUp />} />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default RoutesComponent