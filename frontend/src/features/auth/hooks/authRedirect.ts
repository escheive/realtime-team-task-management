import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook to redirect authenticated users to the provided path
// Mostly for redirecting users already signed in away from login/register
const useAuthRedirect = (isAuthenticated: boolean, redirectPath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);
};

export default useAuthRedirect;
