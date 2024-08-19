import React from 'react';
import useAuthRedirect from '~auth/hooks/authRedirect';
import axios from '~utils/axiosConfig';
import { useAuth } from '~auth/context/AuthContext';
import { UserForm } from '~/features/users/components';
import { useNavigate } from 'react-router-dom';
import { IUser } from '~/features/users/types';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useAuthRedirect(isAuthenticated, "/");

  const handleRegister = async (newUser: Omit<IUser, '_id'>) => {
    try {
      // Make an API call to register the user
      const response = await axios.post('/api/auth/register', newUser);

      if (response.status === 201) {
        // Successfully registered, navigate to the dashboard or login page
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {/* <RegisterForm /> */}
      <UserForm
        mode="register"
        onSubmit={handleRegister}
      />
    </div>
  );
};
