import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoaderTwo } from '@/components/ui/loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="scale-150"><LoaderTwo /></div>
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
