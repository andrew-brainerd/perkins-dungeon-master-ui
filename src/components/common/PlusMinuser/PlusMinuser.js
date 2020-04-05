import React, { useState } from 'react';
import Button from '../Button/Button';
import { string, func, number, object, bool } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './PlusMinuser.module.scss';

const PlusMinuser = ({ className, style = {}, label, initialValue, min, max, onChange, canIncrement = true }) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = newValue => {
    if (value >= min && newValue <= max) {
      setValue(newValue);
      onChange ? onChange(newValue) : noop();
    }
  };

  return (
    <div style={style} className={[styles.plusMinusHost, className].join(' ')}>
      <div className={styles.label}>{label}</div>
      <Button
        className={styles.plusMinusButton}
        text='-'
        onClick={() => updateValue(value - 1)}
        disabled={value <= min}
      />
      <Button
        className={styles.plusMinusButton}
        text='+'
        onClick={() => updateValue(value + 1)}
        disabled={!canIncrement || value >= max}
      />
      <div className={styles.value}>{value}</div>
    </div>
  );
};

PlusMinuser.propTypes = {
  className: string,
  style: object,
  label: string.isRequired,
  initialValue: number.isRequired,
  min: number.isRequired,
  max: number.isRequired,
  onChange: func,
  canIncrement: bool
};

export default PlusMinuser;
