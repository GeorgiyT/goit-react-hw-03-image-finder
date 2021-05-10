import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, deleteFunc }) => {
  return (
    <>
      <ul className={styles.contactList}>
        {contacts.map(el => (
          <li key={el.id}>
            {el.name}: {el.number}
            <button type="button" name={el.id} onClick={() => deleteFunc(el.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deleteFunc: PropTypes.func.isRequired
};

export default ContactList;
