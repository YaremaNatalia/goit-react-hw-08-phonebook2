import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FormContainer, FormTitle, FormWrapper } from './RegisterPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/authentifServices';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Success:', values);
    dispatch(
      loginUserThunk({
        values,
      })
    );
    form.resetFields();
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   const form = event.currentTarget;

  //   const email = form.elements.email.value;
  //   const password = form.elements.password.value;

  //   dispatch(
  //     loginUserThunk({
  //       email,
  //       password,
  //     })
  //   );
  // };
  if (authentificated) return <Navigate to="/contacts" />;
  return (
    <FormContainer>
      <FormTitle>Login into your account</FormTitle>
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
          initialValues={{
            email: '',
            password: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Email"
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
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
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={7}
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
          <p>Email:</p>
          <FormInput
            type="email"
            name="email"
            id="email"
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

        <FormButton type="submit">Sign In</FormButton>
      </FormStyled> */}
    </FormContainer>
  );
};

export default LoginPage;
