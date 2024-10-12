import { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { fetchPicturesWithQuery } from "./image-api.js";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import css from "./App.module.css";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const lastPictureRef = useRef(null);
  const searchBarRef = useRef(null);

  
  useEffect(() => {
    if (!query) return; 

    const fetchPictures = async () => {
      try {
        setLoading(true);
        setError(null); 

        const data = await fetchPicturesWithQuery(query, page);
        if (data.results.length === 0) {
          throw new Error("noimage"); 
        }

        setPictures((prevPictures) =>
          page === 1 ? data.results : [...prevPictures, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (e) {
        setError(e.message === "noimage" ? "No images found" : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [query, page]); 

  useEffect(() => {
    if (!loading && lastPictureRef.current) {
      lastPictureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pictures, loading]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); 
    setPictures([]); 
  };

  const loadMorePictures = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shouldShowLoadMore = pictures.length > 0 && page < totalPages && !loading;

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} ref={searchBarRef} />
      {pictures.length > 0 && (
        <ImageGallery
          items={pictures}
          onImageClick={openModal}
          lastPictureRef={lastPictureRef}
        />
      )}
      {shouldShowLoadMore && <LoadMoreBtn onClick={loadMorePictures} />}
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <button onClick={scrollToTop} className={css.scrollBtn}>
        <IoArrowUpCircleSharp className={css.reactIcons} />
      </button>
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
    </div>
  );
}
