import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../API';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!query) return;
    getImages(query, page);
  }, [page, query]);

  const getImages = async (query, page) => {
    try {
      setIsLoading(true);
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = inputValue => {
    setQuery(inputValue);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImage(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPages = total / images.length;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar images={images} onSubmit={onSubmit} />
      {error && (
        <p className="errorMessage">Whoops, something went wrong: {error}</p>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {isLoading && <Loader />}
      {totalPages > 1 && !isLoading && images.length > 0 && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal
          onCloseModal={onCloseModal}
          tags={tags}
          largeImage={largeImage}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
