import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.phonebook.contacts;
export const selectFilter = state => state.phonebook.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);

// Массив selectVisibleContacts создается с использованием метода Array.prototype.filter().
//Он перебирает каждый контакт в массиве contacts и применяет условие фильтрации на основе следующих критериев:

// contact.name.toLowerCase().includes(filter.toLowerCase()):
//Это проверяет, включает ли имя контакта в нижнем регистре текст фильтрации в нижнем регистре.
//Это обеспечивает регистронезависимый поиск.Если имя контакта соответствует фильтру, оно будет включено в отфильтрованные результаты.

// contact.number.includes(filter): Это проверяет, включает ли номер телефона контакта текст фильтрации.
//Если номер телефона контакта соответствует фильтру, он также будет включен в отфильтрованные результаты.

// Оба эти условия объединяются с помощью логического оператора ИЛИ (||).
//Это означает, что если имя или номер телефона контакта соответствуют фильтру, этот контакт будет включен в массив.

// Полученный массив  содержит только контакты, которые соответствуют условиям фильтрации в соответствии с вводом пользователя.
//Затем этот массив передается компоненту ContactList для отображения, так что отображаются только соответствующие контакты в соответствии с текущим фильтром.
