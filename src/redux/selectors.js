import { createSelector } from '@reduxjs/toolkit';
// !======ОПТИМІЗАЦІЯ КОДУ використання createSelector=====
// якщо змінюється структура  стейту, необхідно відкоректувати лише тут, а не всюди в коді
export const selectContacts = state => state.phonebook.contacts;
export const selectFilter = state => state.phonebook.filter;
export const selectIsLoading = state => state.phonebook.isLoading;
export const selectError = state => state.phonebook.error;

export const selectVisibleContacts = createSelector(
  // передаємо масив селекторів selectContacts, selectFilter
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // приходить те, що повертають "selectContacts, selectFilter" => "contacts, filter"
    return (
      contacts?.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.phone.includes(filter)
      ) ?? []
    ); // якщо contacts не масив і метод фільтр не працюватиме, при додаванні до contacts?  нічого не зламається метод просто не відпрацює. ?? [] - повернеться пустий масив
  }
); // функція selectVisibleContacts відпрацьовує лише якщо відбулись зміни у selectContacts або selectFilter, у іншому випадку при перерендері використовується попереднє значення з кешу (це мемоізація або кешування)
