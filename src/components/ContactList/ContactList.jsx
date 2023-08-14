import { useEffect } from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk, fetchContactsThunk } from 'redux/phonebookReducer';

import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const filteredContacts = useSelector(selectVisibleContacts);

  const onRemoveContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>{name}:</p>
          <span className={css.contactNumber}>{phone}</span>
          <button
            type="button"
            className={css.removeBtn}
            onClick={() => {
              onRemoveContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
