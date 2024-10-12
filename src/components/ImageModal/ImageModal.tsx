import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ReactElement } from "react";
import { IImageCard } from "../../App.Type.ts";

Modal.setAppElement("#root");
type ImageModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  imageData: IImageCard | null;
};

export default function ImageModal({
  isOpen,
  onRequestClose,
  imageData,
}: ImageModalProps): ReactElement | null {
  if (!imageData) return null;

  const {
    urls: { regular },
    alt_description,
    description,
    likes,
    user: { name, instagram_username },
  } = imageData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={regular} alt={alt_description} className={css.image} />
        <div className={css.details}>
          <p>
            <strong>Author:</strong> {name}
          </p>
          {instagram_username && (
            <p>
              <strong>Instagram:</strong> @{instagram_username}
            </p>
          )}
          {description && (
            <p>
              <strong>Description:</strong> {description}
            </p>
          )}
          <p>
            <strong>Likes:</strong> {likes}
          </p>
        </div>
      </div>
    </Modal>
  );
}