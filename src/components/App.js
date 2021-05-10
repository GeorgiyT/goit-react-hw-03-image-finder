import React from "react";
import { v4 as randId } from "uuid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css";

// const testInput = [
//   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//   { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
// ];

// localStorage.setItem("contacts", JSON.stringify(testInput));

class App extends React.Component {
  state = {
    contacts: [],
    filter: ""
  };

  componentDidMount() {
    const storedItems = localStorage.getItem("contacts");
    if (storedItems) {
      this.setState({ contacts: JSON.parse(storedItems) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    let acc = false;

    this.state.contacts.forEach(el => el.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase() && (acc = true));

    acc
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { id: randId(), ...contact }]
        }));
  };

  addFilter = newFilter => {
    this.setState(prevState => ({ contacts: prevState.contacts, filter: newFilter }));
  };

  deleteContact = id => {
    this.setState(prevState => ({ contacts: prevState.contacts.filter(el => el.id !== id) }));
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(el => el.name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <h2 className={styles.headers}>Phonebook</h2>
        <ContactForm addFunc={this.addContact} />
        <h2 className={styles.headers}>Contacts</h2>
        <Filter value={filter} filterFunc={this.addFilter} />
        <ContactList contacts={filteredContacts} deleteFunc={this.deleteContact} />
      </>
    );
  }
}

export default App;
