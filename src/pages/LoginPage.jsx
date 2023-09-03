import React from 'react';

import {
  FormContainer,
  FormLabel,
  FormInput,
  FormStyled,
  FormTitle,
  FormButton,
} from './RegisterPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/authentifServices';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const email = form.elements.email.value;
    const password = form.elements.password.value;

    dispatch(
      loginUserThunk({
        email,
        password,
      })
    );
  };
  if (authentificated) return <Navigate to="/contacts" />;
  return (
    <FormContainer>
      <FormTitle>Login into your account</FormTitle>
      <FormStyled onSubmit={handleSubmit}>
        <FormLabel>
          <p>Email:</p>
          <FormInput
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </FormLabel>

        <FormLabel>
          <p>Password:</p>
          <FormInput
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={7}
          />
        </FormLabel>

        <FormButton type="submit">Sign In</FormButton>
      </FormStyled>
    </FormContainer>
  );
};

export default LoginPage;
