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
    loadMore: false,
    page: 1,
    query: '',
    largeImage: '',
  };

  async componentDidMount() {
    try {
      const { query } = this.state;
      if (query) {
        this.setState({ isLoading: true });
        const images = await fetchImages(this.state.query);
        this.setState({ images });
      }
    } catch (error) {
      if (!this.state.error) {
        this.setState({ error: error.message });
        toast.error(error.message);
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      try {
        this.setState({ isLoading: true });
        const images = await fetchImages(this.state.query);
        if (images.length === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ loadMore: false });
        }
        this.setState({ images });
      } catch (error) {
        if (!this.state.error) {
          this.setState({ error: error.message });
          toast.error(error.message);
        }
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = inputValue => {
    if (!inputValue) {
      this.setState({
        images: [],
        isLoading: false,
        loadMore: false,
        page: 1,
      });
    } else {
      this.setState({
        query: inputValue,
        loadMore: true,
        page: 1,
      });
    }
  };

  onLoadMore = async () => {
    try {
      const { query, page } = this.state;
      this.setState({ isLoading: true, page: page + 1 });
      const newImages = await fetchImages(query, page + 1);
      if (newImages.length === 0) {
        toast.warn(
          'Sorry, there are no more images matching your search query.'
        );
        this.setState({ loadMore: false, isLoading: false });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          loadMore: true,
        }));
      }
    } catch (error) {
      if (!this.state.error) {
        toast.error(error.message);
        this.setState({ isLoading: false, loadMore: false });
      }
    }
  };

  onOpenModal = largeImageURL => {
    if (!largeImageURL) {
      toast.info('Oops, there is no image..');
    } else {
      this.setState({
        showModal: true,
        largeImage: largeImageURL,
      });
    }
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      largeImage: '',
    });
  };

  render() {
    const { images, largeImage, showModal, isLoading, loadMore, error } =
      this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {error && (
          <p className="errorMessage">Whoops, something went wrong: {error}</p>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {loadMore && <Button onLoadMore={this.onLoadMore} />}

        {showModal && (
          <Modal
            onCloseModal={this.onCloseModal}
            images={images}
            image={largeImage}
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
