import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContactThunk } from '../../redux/phonebookReducer';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onChangeInput = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    const contactData = {
      name,
      phone: phone.replace(/[\s()-]+/g, ''),
    };

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.phone === phone
    );

    if (isDuplicateName) {
      return Notiflix.Notify.failure(
        `${name} or ${phone} is already in contacts!`
      );
    }

    dispatch(addContactThunk(contactData));
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.formGroup}>
        <label className={css.formLabel}>
          <p>Name</p>
        </label>

        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChangeInput}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel}>
          <p>Phone number</p>
        </label>

        <input
          className={css.formInput}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={onChangeInput}
        />
      </div>

      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
