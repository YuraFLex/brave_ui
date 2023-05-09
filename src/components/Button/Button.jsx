import React from 'react';
import s from './Button.module.scss';

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
      {text}
    </button>
  );
};
