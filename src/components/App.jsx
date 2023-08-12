import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';



export const App = () => {

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
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList/>
      </div>
    </div>
  );
};
