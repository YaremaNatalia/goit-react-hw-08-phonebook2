import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
