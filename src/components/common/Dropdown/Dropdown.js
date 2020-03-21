import React from 'react';
import { string, array, func } from 'prop-types';
import styles from './Dropdown.module.scss';

const Dropdown = ({ className, options, displayKey, valueKey, selectedOption, onOptionSelected }) => {
  return (
    <div className={styles.dropdown}>
      <select
        className={[
          styles.dropdownInput,
          className || ''
        ]}
        value={selectedOption}
        onChange={e => onOptionSelected(e.target.value)}
      >
        {options.map((option, o) =>
          <option
            key={o}
            value={option[valueKey]}
          >
            {option[displayKey]}
          </option>
        )}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  className: string,
  options: array.isRequired,
  displayKey: string.isRequired,
  valueKey: string.isRequired,
  selectedOption: string.isRequired,
  onOptionSelected: func.isRequired
};

export default Dropdown;
