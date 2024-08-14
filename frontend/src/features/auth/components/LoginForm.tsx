import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~context/AuthContext";
import axios from "~utils/axiosConfig";
import useAuthRedirect from "~hooks/auth";

export const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useAuthRedirect(isAuthenticated, "/");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.accessToken;

      // Store token in localStorage
      login(token);

      navigate("/");
    } catch (error) {
      console.error("Error logging in user:", error);
      alert("Error logging in user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};