import css from "./ImageCard.module.css";
import { ReactElement } from "react";
type Props = {
  alt: string;
  src: string;
  onClick: () => void;
};
export default function ImageCard({ alt, src, onClick }: Props): ReactElement {
  return (
    <div>
      <img src={src} alt={alt} onClick={onClick} className={css.cardImg} />
    </div>
  );
}