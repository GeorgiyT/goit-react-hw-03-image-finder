import React from "react";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Searchbar from "./Searchbar/Searchbar";
import fetchPictures from "./Services/Services.js";
import Modal from "./Modal/Modal";
import { v4 as randId } from "uuid";
import SetLoader from "./Loader/Loader";

class App extends React.Component {
  state = {
    query: "",
    imagesArr: [],
    activePage: 1,
    isLoaded: true,
    modalUrl: "",
    openModal: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.activePage !== this.state.activePage) {
      this.getFetch();
    }
  }

  getFetch = () => {
    this.setState({ isLoaded: false });
    fetchPictures(this.state.query, this.state.activePage)
      .then(responce =>
        this.setState(prevState => ({
          imagesArr: [
            ...prevState.imagesArr,
            ...responce.data.hits.map(hit => ({
              id: randId(), //Непонятно почему, но с айдишниками из БД показывает ошибку на повторяющиеся айди, возможно они там уникальны только на 1 страницу
              webformatURL: hit.webformatURL,
              largeImageURL: hit.largeImageURL
            }))
          ]
        }))
      )
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ isLoaded: true });
      });
  };

  onSearch = searchOption => {
    this.setState({ query: searchOption, imagesArr: [], activePage: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      activePage: prevState.activePage + 1
    }));
  };

  listClickFunc = id => {
    const bigPicUrl = this.state.imagesArr.find(image => image.id === id).largeImageURL;
    this.openModal(bigPicUrl);
  };

  openModal = item => {
    this.setState({ modalUrl: item, openModal: true });
    window.addEventListener("keydown", this.closeModal);
  };

  closeModal = e => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      this.setState({ modalUrl: "", openModal: false });
      window.removeEventListener("keydown", this.closeModal);
    }
  };

  render() {
    const imageList = this.state.imagesArr.map(image => (
      <ImageGalleryItem
        key={image.id}
        webformatURL={image.webformatURL}
        queryName={this.state.query}
        clickFunk={() => {
          this.listClickFunc(image.id);
        }}
      />
    ));

    if (this.state.activePage !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    }

    return (
      <>
        <Searchbar setQuery={this.onSearch} />
        <ImageGallery>{imageList}</ImageGallery>
        {this.state.imagesArr.length && this.state.isLoaded ? <Button clickFunction={this.onLoadMore} /> : ""}
        {!this.state.isLoaded && <SetLoader />}
        {this.state.openModal && <Modal image={this.state.modalUrl} text={this.state.query} clickFunk={this.closeModal} />}
      </>
    );
  }
}

export default App;
