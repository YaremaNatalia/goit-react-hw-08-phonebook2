import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../API';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    query: '',
    largeImage: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.getImages(this.state.query, this.state.page);
    }
  }

  getImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = inputValue => {
    this.setState({
      query: inputValue,
      images: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImage: largeImageURL,
      tags,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      largeImage: '',
      tags: '',
    });
  };

  render() {
    const { images, largeImage, showModal, isLoading, total, tags, error } =
      this.state;
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
        <Searchbar images={images} onSubmit={this.onSubmit} />
        {error && (
          <p className="errorMessage">Whoops, something went wrong: {error}</p>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {totalPages > 1 && !isLoading && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal
            onCloseModal={this.onCloseModal}
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
  }
}
