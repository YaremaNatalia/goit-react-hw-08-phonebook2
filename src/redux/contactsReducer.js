import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  requestContactsThunk,
} from './contactsServices';

const initialState = {
  contacts: null,
  isLoading: false,
  error: null,
  filter: '',
};
const contactsSlise = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, actions) {
      state.filter = actions.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(requestContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(requestContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ----- ADD CONTACT -----
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts = [...state.contacts, action.payload];
        state.contacts.push(action.payload);
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ----- DELETE CONTACT -----
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts = state.contacts.filter(
        //   contact => contact.id !== action.payload.id
        // );
        const indexDeletedContact = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(indexDeletedContact, 1);
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});


export const { setFilter } = contactsSlise.actions;
export const contactsReducer = contactsSlise.reducer;
