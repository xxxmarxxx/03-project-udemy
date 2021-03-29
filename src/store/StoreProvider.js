import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return;
  <StoreContext.Provider value={}>{children}</StoreContext.Provider>;
};
export default StoreProvider;
