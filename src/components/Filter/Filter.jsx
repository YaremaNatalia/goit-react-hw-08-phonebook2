import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/phonebookReducer';

import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.formGroup}>
      <label className={css.formLabel}>
        <p>Find contacts by name o phone number</p>
      </label>

      <input
        className={css.formInput}
        type="text"
        title="Filter using letters, digits, apostrophe, dash and spaces, and can start with +."
        required
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};
