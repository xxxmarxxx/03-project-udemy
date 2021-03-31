import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import bemCssModule from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";
import request from "../../helpers/request";

import { default as CourseStyle } from "./Course.module.scss";


const style = bemCssModule(CourseStyle);

const Course = ({ authors, id, img, price, isUserContext=false, title }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const allAuthors = authors.join(", ");
  const isUserLogged = Boolean(user);

  const handelOnClick = async () => {
    try {
      const { data, status } = await request.patch
      ("/users", 
      {
        login: user.login,
        courseId: id,
      });
      if(status === 202){
        setUser(data.user)
        history.push('/my-courses');
      }
    } catch (error) {
      console.log(error);
    }
  };
// ukrycie button na 
  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li className={style()}>
      <article className={style()}>
        <h3 className={style("title")}> </h3>
        <img src={img} alt={title} className={style("image")} />
        <p className={style("price")}>{`Koszt kursu ${price}€`}</p>
        <p className={style("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && <button onClick={handelOnClick} className='btn'>Kupuje kurs</button>}
      </article>
    </li>
  );
};

export default Course;
