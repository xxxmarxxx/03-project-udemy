import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";

import { default as HeaderStyle } from "./Header.module.scss";
import LoginForm from '../LoginForm/LoginForm';

const style = bemCssModules(HeaderStyle);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, setUser } = useContext(StoreContext);

  const handleOnClose = ()=> setIsModalOpen(false)

  const handleOnClick = () => {
    if(Boolean(user)){
      setUser(null)
    } else {
      setIsModalOpen(true)
    }
  }

  const setProperlyLabel = Boolean(user) ? "logout" : "login";
  return (
    <header className={style()}>
      <div className={style("logo-wrapper")} />
      <h2 className={style("title")}>Super kursy dla...</h2>
      <button onClick={handleOnClick} className="btn_log">{setProperlyLabel}</button>
      <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen}/>
    </header>
  );
};

export default Header;
