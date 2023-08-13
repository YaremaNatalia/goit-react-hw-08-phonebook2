import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        {error && (
          <p className="errorMessage">Whoops, something went wrong: {error}</p>
        )}
        <ContactForm />
        <h2>Contacts</h2>
        {contacts.length > 0 && <Filter />}
        {isLoading && <Loader />}
        <ContactList />
      </div>
    </div>
  );
};
