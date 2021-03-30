import React, { useState, useContext } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../Modal/Modal";

import { default as LoginFormStyles } from "./LoginForm.module.scss";
import { StoreContext } from "../../store/StoreProvider";
import request from "../../helpers/request";
const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);

  const handleOnChangeLogin = ({ target }) => setLogin(target.value); // wersja 1
  const handleOnChangePassword = ({ target: { value } }) => setPassword(value); // wersja 2
  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateOfInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await request.post("/users", { login, password });
    if ((status === 200)) {
      setUser(data.user);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldCloseOnOutsideClick={true}
    >
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Password:
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>
        <div className={style("row")}>
          <button className='btn' type="submit">zaloguj</button>
          <button  className='btn' onClick={handleOnCloseModal} type="button">
            anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;