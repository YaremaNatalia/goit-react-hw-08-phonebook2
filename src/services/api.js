import axios from 'axios';
axios.defaults.baseURL = 'https://64d8f7b15f9bf5b879cec100.mockapi.io/api';

export const fetchGetContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const fetchAddContact = async newContact => {
  const { data } = await axios.post('/contacts', newContact);
  return data;
};

export const fetchDeleteContact = async contactId => {
  const { data } = await axios.delete(`/contacts/${contactId}`);
  return data;
};
