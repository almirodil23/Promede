// app/login.tsx
import React from 'react';
import { useAuth } from '../context/auth';
import LoginComponent from '../components/LoginComponent';

export default function LoginScreen() {
  return <LoginComponent />;
}