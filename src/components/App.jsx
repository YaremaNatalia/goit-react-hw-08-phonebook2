import React from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Button } from './Button';
// import { Modal } from './Modal';

export class App extends React.Component {
  state = {};

  render() {
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
        <ImageGallery />
        <ImageGalleryItem />
        <Loader />
        <Button />
        {/* <Modal /> */}
      </div>
    );
  }
}
