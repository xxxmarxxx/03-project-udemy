import React, { useContext, useState } from "react";

import CourseDetails from "./subcomponents/CoursesDetails";
import CoursePopup from "./subcomponents/CoursePopup";
import { StoreContext } from "../../store/StoreProvider";

const AdminPanel = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { courses } = useContext(StoreContext);

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsOpenPopup(false);
  };

  const coursesElements = courses.map((course) => (
    <CourseDetails key={course.id} {...course} />
  ));

  return (
    <section>
      {coursesElements}
      <button onClick={showPopup} className='btn'>Dodaj nowy kurs</button>
      <CoursePopup
        isEditMode={false}
        isOpenPopup={isOpenPopup}
        hidePopup={hidePopup}
      />
    </section>
  );
};

export default AdminPanel;
