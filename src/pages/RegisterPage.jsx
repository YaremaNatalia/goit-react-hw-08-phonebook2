import React from 'react';

import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
  FormStyled,
  FormTitle,
} from './RegisterPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from 'redux/authentifServices';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    dispatch(
      registerUserThunk({
        name,
        email,
        password,
      })
    );
  };
  if (authentificated) return <Navigate to="/contacts" />;
  return (
    <FormContainer>
      <FormTitle>Register your account</FormTitle>
      <FormStyled onSubmit={handleSubmit}>
        <FormLabel>
          <p>Name:</p>
          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="Enter your username"
            required
            minLength={2}
          />
        </FormLabel>

        <FormLabel>
          <p>Email:</p>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            autoComplete="on"
          />
        </FormLabel>

        <FormLabel>
          <p>Password:</p>
          <FormInput
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={7}
            autocomplete="current-password"
          />
        </FormLabel>

        <FormButton type="submit">Sign Up</FormButton>
      </FormStyled>
    </FormContainer>
  );
};

export default RegisterPage;
