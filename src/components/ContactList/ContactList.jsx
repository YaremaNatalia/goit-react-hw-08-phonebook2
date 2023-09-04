import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/contactsServices';
import { selectFilteredContacts } from 'redux/selectors';
import {
  ContactItem,
  ContactName,
  ContactNumber,
  ContactUl,
  RemoveBtn,
} from './ContactList.styled';
import { FormTitle } from 'pages/RegisterPage.styled';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };
  return (
    <div>
      <FormTitle>Your contacts</FormTitle>
      <ContactUl>
        {filteredContacts.map(contact => {
          return (
            <ContactItem key={contact.id}>
              <ContactName>{contact.name}</ContactName>
              <ContactNumber>{contact.number}</ContactNumber>
              <RemoveBtn
                onClick={() => handleDeleteContact(contact.id)}
                type="button"
                aria-label="Delete contact"
              >
                &times;
              </RemoveBtn>
            </ContactItem>
          );
        })}
      </ContactUl>
    </div>
  );
};
