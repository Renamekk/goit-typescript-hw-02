import css from "./ErrorMessage.module.css";

export default function ErrorMessage({error}) {
  let text;
  switch (error) {
    case "noimage":
      { text ="Не знайдено зображень, що відповідають вашому запиту.";
        break;}
    case "wrong":
    {  text ="Упс, щось пішло не так! Будь ласка, уточніть запит!";  break;}
  }
  return (
    <p className={css.errorText}>
      {text}
    </p>
  );
}