import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";

import { default as CoursesStyles } from "./Courses.module.scss";

import Course from './subcomponents/Course';
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CoursesStyles);

const Courses = () => {
  const { courses } = useContext(StoreContext);

  const coursesElement = courses.map((course) => (
    <Course key={course.id} {...course} />
  ));
  return (
    <section className={style()}>
      <h3 className={style("title")}> </h3>
      <ul className={style("list")}>{coursesElement}</ul>
    </section>
  );
};

export default Courses;
