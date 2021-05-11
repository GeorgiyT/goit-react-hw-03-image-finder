import React from "react";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Searchbar from "./Searchbar/Searchbar";
import fetchPictures from "./Services/Services.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends React.Component {
  state = {
    query: "",
    imagesArr: [],
    activePage: 1,
    isLoaded: true
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
              id: hit.id,
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

  render() {
    const imageList = this.state.imagesArr.map(image => (
      <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} queryName={this.state.query} />
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
        {!this.state.isLoaded && <Loader type="Puff" color="#00BFFF" height={100} width={100} />}
      </>
    );
  }
}

export default App;
