import { forwardRef } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { IFormValues, ISearchBarProps } from "./Search.types.ts";

const SearchBar = forwardRef<HTMLElement, ISearchBarProps>(
  function SearchBarComponent({ onSearch }, ref) {
    const handleSubmit = (
      values: IFormValues,
      actions: FormikHelpers<IFormValues>
    ) => {
      const text = values.query.trim();
      if (!text) {
        toast.error("Enter a query before!");
        return;
      }
      onSearch(text);
      actions.resetForm();
    };

    return (
      <header className={css.container} ref={ref}>
        <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
          <Form className={css.wraper}>
            <Field
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.input}
            />

            <Toaster position="top-right" reverseOrder={false} />

            <button type="submit">
              <FiSearch size="16px" />
            </button>
          </Form>
        </Formik>
      </header>
    );
  }
);

export default SearchBar;