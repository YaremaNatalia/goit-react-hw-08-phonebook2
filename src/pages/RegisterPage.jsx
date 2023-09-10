import React from 'react';

import { Button, Form, Input } from 'antd';
import { FormContainer, FormTitle, FormWrapper } from './RegisterPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from 'redux/authentifServices';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);

  const onFinish = values => {
    dispatch(
      registerUserThunk({
        values,
      })
    );
    form.resetFields();
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  // const handleSubmit = event => {
  //   event.preventDefault();

  //   const form = event.currentTarget;

  //   const name = form.elements.name.value;
  //   const email = form.elements.email.value;
  //   const password = form.elements.password.value;

  //   dispatch(
  //     registerUserThunk({
  //       name,
  //       email,
  //       password,
  //     })
  //   );
  // };

  if (authentificated) return <Navigate to="/contacts" />;

  return (
    <FormContainer>
      <FormTitle>Register your account</FormTitle>
      <FormWrapper>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{ email: '', password: '' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>

      {/* <FormStyled onSubmit={handleSubmit}>
        <FormLabel>
          <p>Name:</p>

          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="input username"
            required
            minLength={2}
            autoComplete="on"
          />
        </FormLabel>

        <FormLabel>
          <p>Email:</p>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="input email"
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
      </FormStyled> */}
    </FormContainer>
  );
};

export default RegisterPage;
