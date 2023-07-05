import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

export const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="36"
        visible={true}
      />
    </div>
  );
};

RotatingLines.propTypes = {
  strokeColor: PropTypes.string.isRequired,
  strokeWidth: PropTypes.string.isRequired,
  animationDuration: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};
