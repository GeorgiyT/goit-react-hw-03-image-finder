import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ value, filterFunc }) => {
  const handleChange = ({ target: { value } }) => {
    filterFunc(value);
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.filter__header}>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={value}
        onChange={handleChange}
        className={styles.filter__input}
      />
    </div>
  );
};

Filter.propTypes = {
  filterFunc: PropTypes.func.isRequired
};

export default Filter;
