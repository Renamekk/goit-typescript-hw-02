import css from "./ImageGallery.module.css";
import { ReactElement, RefObject } from "react";
import { IImageCard } from "../../App.Type.ts";
import ImageCard from "../ImageCard/ImageCard.tsx";

type Props = {
  items: IImageCard[];
  onImageClick: (imageClick: IImageCard) => void;
  lastPictureRef: RefObject<HTMLLIElement>;
};

export default function ImageGallery({
  items,
  onImageClick,
  lastPictureRef,
}: Props): ReactElement {
  return (
    <ul className={css.container}>
      {items.map(
        (
          { id, urls, alt_description, description, likes, user }: IImageCard,
          i
        ) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={id}
              className={css.wrap}
              ref={isLast ? lastPictureRef : null}
            >
              <ImageCard
                src={urls.small}
                alt={alt_description}
                onClick={() =>
                  onImageClick({
                    id,
                    urls,
                    alt_description,
                    description,
                    likes,
                    user,
                  })
                }
              />
            </li>
          );
        }
      )}
    </ul>
  );
}