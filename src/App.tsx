import css from "./App.module.css";
import { ReactElement, useEffect, useRef, useState } from "react";
import { fetchPicturesWithQuery } from "./Api/imageApi.ts";
import ImageModal from "./components/ImageModal/ImageModal.tsx";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.tsx";
import Loader from "./components/Loader/Loader.tsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.tsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import { IAllImage, IImageCard } from "./App.Type.ts";

function App(): ReactElement {
  const [pictures, setPictures] = useState<IImageCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImageCard | null>(null);
  const lastPictureRef = useRef<HTMLLIElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && lastPictureRef.current) {
      lastPictureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pictures, loading]);

  async function handleSearch(newQuery: string): Promise<void> {
    try {
      setPictures([]);
      setError("");
      setLoading(true);
      setQuery(newQuery);
      setPage(1);
      const data: IAllImage = await fetchPicturesWithQuery<IAllImage>(
        newQuery,
        1
      );
      if (data.results.length === 0) {
        throw "noimage";
      }
      setPictures(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      if (error === "noimage") {
        setError("noimage");
      } else {
        setError("wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadMorePictures(): Promise<void> {
    try {
      setLoading(true);
      const nextPage: number = page + 1;
      const data: IAllImage = await fetchPicturesWithQuery<IAllImage>(
        query,
        nextPage
      );
      setPictures(prevPictures => [...prevPictures, ...data.results]);
      setPage(nextPage);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("wrong");
    } finally {
      setLoading(false);
    }
  }

  const openModal = (imageData: IImageCard) => {
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

  const shouldShowLoadMore =
    pictures.length > 0 && page < totalPages && !loading;

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
      {error !== "" ? <ErrorMessage error={error} /> : null}
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

export default App;