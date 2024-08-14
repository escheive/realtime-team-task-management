import React from 'react';
import { LoginForm } from '~auth/components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};
