import React, { useState } from 'react';
import useAuthRedirect from '~auth/hooks/authRedirect';
import axios from '~utils/axiosConfig';
import { useAuth } from '~auth/context/AuthContext';

export const RegisterForm: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useAuthRedirect(isAuthenticated, '/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth', { email, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
      <button type='submit'>Register</button>
    </form>
  );
};