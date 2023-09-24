import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/contactsReducer';
import { FormGroup, FormLabel } from './Filter.styled';

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
        <Input
          type="text"
          placeholder="Enter letters or digits to filter your contacts"
          value={filter}
          onChange={onFilterChange}
          required
        />
      </FormLabel>
    </FormGroup>
  );
};
