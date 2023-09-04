import { useDispatch, useSelector } from 'react-redux';

import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/contactsReducer';
import { FormGroup } from './Filter.styled';
import { FormInput, FormLabel } from 'pages/RegisterPage.styled';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <FormGroup>
      <FormLabel>
        <p>Find contacts by name or phone number:</p>
        <FormInput
          type="text"
          placeholder="Enter letters or digits to filter your contacts"
          required
          value={filter}
          onChange={onFilterChange}
        />
      </FormLabel>
    </FormGroup>
  );
};
