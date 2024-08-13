import React, { useState } from 'react';
import axios from '~utils/axiosConfig';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      alert('Login successful');
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Error logging in user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
