import React from 'react';
import s from './Button.module.scss';
import { IoIosLogOut } from 'react-icons/io';

export const Button = ({ type, text }) => {
  return (
    <button className={s.btn} type={type}>
      {text}
    </button>
  );
};

export const LogOutButton = ({ text, clickHeandler }) => {
  return (
    <button className={s.buttonLogOut} onClick={clickHeandler}>
      <IoIosLogOut size={30} />
      {text}
    </button>
  );
};
