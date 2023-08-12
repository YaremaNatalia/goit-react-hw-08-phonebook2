import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.push(payload); // Додаємо контакти в масив з payload
    },

    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      ); // перезаписуємо відфільтрований масив контаків, що не містить id з payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
