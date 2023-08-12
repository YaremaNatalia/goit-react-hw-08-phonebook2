import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.phonebook.contacts;
export const selectFilter = state => state.phonebook.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);