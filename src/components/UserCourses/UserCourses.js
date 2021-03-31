import React, { useContext } from "react";
import bemCssModule from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";

import { default as UserCoursesStyles } from "./UserCourses.module.scss";
import Course from "../Course/Course";

const style = bemCssModule(UserCoursesStyles);

const UserStyles = () => {
  const { user, courses } = useContext(StoreContext);

// zakupione kursy uzytkownika
  const buyedCourses = courses.filter((course) =>
    user.courses.includes(course.id)).map(course => <Course key={course.id}{...course}/>);

  return (
    <section className={style()}>
      <h2 className={style("title")}>Twoje wykupione kursy</h2>
      <ul className={style("list")}>
        {buyedCourses}
      </ul>
    </section>
  );
};

export default UserStyles;
