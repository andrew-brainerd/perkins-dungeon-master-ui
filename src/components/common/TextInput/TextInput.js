import React, { useRef, useEffect } from 'react';
import { string, bool, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './TextInput.module.scss';

const TextInput = ({
  name,
  className,
  placeholder,
  value = '',
  inputClassName,
  autofocus,
  onChange,
  onPressEnter,
  onFocus,
  onBlur
}) => {
  const inputRef = useRef();

  useEffect(() => {
    autofocus && inputRef.current.focus();
  }, [autofocus]);

  const handleChange = event => {
    const newValue = event.target.value;
    onChange ? onChange(newValue) : noop();
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      if (onPressEnter) {
        onPressEnter();
        handleChange({ target: { value: '' } });
      } else {
        noop();
      }
    }
  };

  return (
    <div className={[
      styles.textInputContainer,
      className || ''
    ].join(' ')}
    >
      <input
        name={name}
        type={'text'}
        className={[
          styles.textInput,
          inputClassName || ''
        ].join(' ')}
        placeholder={placeholder || ''}
        ref={inputRef}
        value={value}
        autoComplete={'false'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
    </div>
  );
};

TextInput.propTypes = {
  name: string,
  className: string,
  placeholder: string,
  value: string,
  inputClassName: string,
  error: string,
  autofocus: bool,
  onChange: func,
  onPressEnter: func,
  onFocus: func,
  onBlur: func
};

export default TextInput;
