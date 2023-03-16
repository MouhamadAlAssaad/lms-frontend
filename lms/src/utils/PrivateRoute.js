
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoutes = () => {
  const [cookies] = useCookies(['auth']);
  const isAuthenticated = !!cookies.auth;
 console.log(cookies.auth)
  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/' />
  );
};

export default PrivateRoutes;
