// import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import styled from 'styled-components';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    margin-top: -0.75rem;
    margin-bottom: 1rem;
`;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function CreateAccount() {
    const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User created:', userCredential.user);
      // Handle successful user creation
      navigate('/'); // 홈 화면으로 이동

    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error
    }
  };

  return (
    <Wrapper>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name')} placeholder="Name" type="text" />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        
        <Input {...register('email')} placeholder="Email" type="email" />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        
        <Input {...register('password')} placeholder="Password" type="password" />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        
        <Input {...register('confirmPassword')} placeholder="Confirm Password" type="password" />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        
        <button type="submit">Create Account</button>
      </Form>
    </Wrapper>
  );
}