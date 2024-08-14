import React from 'react';
import LoginForm from '~components/auth/UserLoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};
