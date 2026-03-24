import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader fullscreen />;
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;