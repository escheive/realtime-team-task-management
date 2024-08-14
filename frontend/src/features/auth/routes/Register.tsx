import React from 'react';
import { RegisterForm } from '~auth/components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
};
