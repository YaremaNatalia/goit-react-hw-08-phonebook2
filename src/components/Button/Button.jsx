import css from './Button.module.css';
// import PropTypes from 'prop-types';

export const Button = () => {
  return (
    <button type="button" className={css.loadMoreBtn}>
      Load more
    </button>
  );
};
