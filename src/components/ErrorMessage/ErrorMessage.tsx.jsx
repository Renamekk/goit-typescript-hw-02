import css from "./ErrorMessage.module.css";
import { ReactElement } from "react";
type Props = {
  error: string;
};
export default function ErrorMessage({ error }: Props): ReactElement {
  let text;
  switch (error) {
    case "noimage": {
      text = "no images found matching your request";
      break;
    }
    case "wrong": {
      text = "Whoops, something went wrong! Please try to clarify the request!";
      break;
    }
  }
  return <p className={css.errorText}>{text}</p>;
}