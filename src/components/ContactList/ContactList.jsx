import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from '../../redux/phonebookReducer';

export const ContactList = () => {
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);

  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const onRemoveContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>{name}:</p>
          <span className={css.contactNumber}>{number}</span>
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
