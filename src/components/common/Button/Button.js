import React from 'react';
import { node, bool, func, string } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './Button.module.scss';

const Button = ({ children, className, disabled, name, onClick, text }) => (
  <div
    name={name}
    className={[
      styles.button,
      disabled ? styles.disabled : '',
      className
    ].join(' ')}
    onClick={!disabled ? onClick : noop}
  >
    {children || text}
  </div>
);

Button.propTypes = {
  children: node,
  className: string,
  disabled: bool,
  name: string,
  onClick: func.isRequired,
  text: string
};

export default Button;
