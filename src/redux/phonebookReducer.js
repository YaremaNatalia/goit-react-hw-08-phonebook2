import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchGetContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../services/api';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const contacts = await fetchGetContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const contacts = await fetchAddContact(contact);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const contacts = await fetchDeleteContact(contactId);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setFilter(state, actions) {
      state.filter = actions.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ================== ADD CONTACT ==================
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ================== DELETE CONTACT ==================
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      
        // const deletedContactId = action.payload.id;
        // state.contacts = state.contacts.filter(
        //   contact => contact.id !== deletedContactId
        // );

        const deletedContactIndex = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(deletedContactIndex, 1);
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
