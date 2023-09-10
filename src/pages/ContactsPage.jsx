import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { Button, Form, Input } from 'antd';
import {
  selectAuthentificated,
  selectContactsError,
  selectContactsIsloading,
  selectUserContacts,
} from 'redux/selectors';
import { addContactThunk, requestContactsThunk } from 'redux/contactsServices';
import { Loader } from 'components/Loader';
import { FormContainer, FormTitle } from './RegisterPage.styled';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

const ContactsPage = () => {
  const authentificated = useSelector(selectAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsloading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;
    const contactData = {
      name,
      number: number.replace(/[\s()-]+/g, ''),
    };

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isDuplicateName) {
      form.reset();
      return Notiflix.Notify.failure(
        `Contact with name ${name} or phone number ${number} is already in contacts!`
      );
    }

    dispatch(addContactThunk(contactData));
    form.reset();
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <p className="errorMessage">Whoops, something went wrong: {error}</p>
      )}
      <section>
        <FormContainer>
          <FormTitle>Add new contact</FormTitle>
          <Form
            onSubmit={handleSubmit}
            name="wrap"
            labelCol={{
              flex: '110px',
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Name"
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="text"
                name="contactName"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                placeholder="Enter name"
                required
              />
            </Form.Item>

            <Form.Item
              label="Number"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                name="contactNumber"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                type="text"
                placeholder="Enter phone number"
                required
              />
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Add contact
              </Button>
            </Form.Item>
          </Form>

          {/* <FormStyled onSubmit={handleSubmit}>
            <FormLabel>
              <p>Name:</p>
              <FormInput
                type="text"
                name="contactName"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                placeholder="Enter name"
                required
              />
            </FormLabel>

            <FormLabel>
              <p>Number:</p>
              <FormInput
                name="contactNumber"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                type="text"
                placeholder="Enter phone number"
                required
              />
            </FormLabel>

            <FormButton type="submit">Add contact</FormButton>
          </FormStyled> */}
          {contacts && contacts.length > 0 && <Filter />}
          {contacts && contacts.length > 0 && <ContactList />}
        </FormContainer>
      </section>
    </div>
  );
};

export default ContactsPage;
