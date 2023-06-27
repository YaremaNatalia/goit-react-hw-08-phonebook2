import css from './ImageGalleryItem.module.css';
// import PropTypes from 'prop-types';

export const ImageGalleryItem = () => {
  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItemImage} src="" alt="" />
    </li>
  );
};
