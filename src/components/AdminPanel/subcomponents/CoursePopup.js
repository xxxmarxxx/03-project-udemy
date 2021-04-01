import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../../Modal/Modal";
import { StoreContext } from "../../../store/StoreProvider";

import { default as CoursePopupStyle } from "./CoursePopup.module.scss";
import request from "../../../helpers/request";

const style = bemCssModules(CoursePopupStyle);

const CoursePopup = ({
  authors = [],
  hidePopup,
  isEditMode = true,
  isOpenPopup,
  id,
  img = "",
  price = 0,
  title = "",
}) => {
  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, setFormAuthor] = useState("");
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext);

  const handleOnChangeAuthor = (event) => setFormAuthor(event.target.value);
  const handleOnChangeImg = (event) => setFormImg(event.target.value);
  const handleOnChangePrice = (event) => setFormPrice(event.target.value);
  const handleOnChangeTitle = (event) => setFormTitle(event.target.value);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const courseObject = {
      authors: formAuthors,
      id,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
    };
    if (isEditMode) {
      const { data, status } = await request.put("/courses", courseObject);
      if (status === 202) {
        setCourses(data.courses);
      }
    } else {
      const { data, status } = await request.post("/courses", courseObject);
      if (status === 201) {
        setCourses(data.courses);
      }
    }
    hidePopup();
  };

  const addAuthor = (event) => {
    event.preventDefault();

    setFormAuthors((prev) => [...prev, formAuthor]);
    setFormAuthor();
  };

  const deleteAuthor = (event) => {
    const authorToDelete = event.target.dataset.author;
    setFormAuthors((prev) =>
      prev.filter((author) => author !== authorToDelete)
    );
  };

  const authorsElements = formAuthors.map((author) => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor} className="btn">
        Usun
      </button>
    </li>
  ));

  const correctLabel = isEditMode ? "Aktualizuj kurs" : "Utworz kurs";

  return (
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
      <div className={style()}>
        <form
          className={style("form")}
          method="submit"
          onSubmit={handleOnSubmit}
        >
          <div className={style("form-row")}>
            <label>
              Author:
              <input
                className={style("input")}
                onChange={handleOnChangeAuthor}
                type="text"
                value={formAuthor}
              />
              <button onClick={addAuthor}>Dodaj autora</button>
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              ImgUrl:
              <input
                className={style("input")}
                onChange={handleOnChangeImg}
                type="text"
                value={formImg}
              />
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              Price:
              <input
                className={style("input")}
                onChange={handleOnChangePrice}
                type="number"
                value={formPrice}
              />
            </label>
          </div>
          <div className={style("form-row")}>
            <label>
              Title:
              <input
                className={style("input")}
                onChange={handleOnChangeTitle}
                type="text"
                value={formTitle}
              />
            </label>
          </div>
          <button type="submit">{correctLabel}</button>
          <button onClick={hidePopup} type="button">
            Anuluj
          </button>
        </form>
        <p>Lista autorow:</p>
        <ul>{authorsElements}</ul>
      </div>
    </Modal>
  );
};

export default CoursePopup;
