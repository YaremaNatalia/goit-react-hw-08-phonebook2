import { createSelector } from '@reduxjs/toolkit';

export const selectUserLoading = state => state.authentif.isLoading;
export const selectUserError = state => state.authentif.error;
export const selectToken = state => state.authentif.token;
export const selectUserData = state => state.authentif.userData;
export const selectAuthentificated = state => state.authentif.authentificated;

export const selectUserContacts = state => state.contacts.contacts;
export const selectContactsIsloading = state => state.contacts.isLoading;
export const selectFilter = state => state.contacts.filter;
export const selectContactsError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  // передаємо масив селекторів selectContacts, selectFilter
  [selectUserContacts, selectFilter],
  (contacts, filter) => {
    // приходить те, що повертають "selectContacts, selectFilter" => "contacts, filter"
    return (
      contacts?.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          (contact.phone && contact.phone.includes(filter))
      ) ?? []
    ); // якщо contacts не масив і метод фільтр не працюватиме, при додаванні до contacts?  нічого не зламається метод просто не відпрацює. ?? [] - повернеться пустий масив
  }
);
