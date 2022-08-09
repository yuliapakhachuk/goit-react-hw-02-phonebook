import { Component } from "react";
import { nanoid } from 'nanoid'
import Form from "./Form/Form";
import ContactList from "./ContactList/ContactList";
import Section from './Section/Section';
import Filter from './Filter/Filter';
import styled from '@emotion/styled';

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }

  createNewContact = (currentValue) => {
    const alreadyAdded = this.state.contacts.some(
      obj => obj.name === currentValue.name);
    alreadyAdded ?
      alert(`${currentValue.name} is already in contacts`)
    :
      this.setState(prevState => {
        const newContact = {
          name: currentValue.name, 
          id: nanoid(),
          number: currentValue.number,
        }
        return (
        {contacts: [...prevState.contacts, newContact]}
      )})
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  changeFilter = (e) => {
    this.setState({filter: e.target.value});
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filtredContacts = this.state.contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter))
      return (
        <AppStyled>
          <Section title={"Phonebook"}>
            <Form onSubmit={this.createNewContact}></Form>
          </Section>
          <Section title={"Contacts"}>
            <Filter
                value={this.state.filter}
                onChange={this.changeFilter}
            />
            <ContactList 
              contacts={filtredContacts}
              onDelete={this.deleteContact}
            />
          </Section>
        </AppStyled>
      );
  }
};

const AppStyled = styled.div`
width: 100%;
height: 100vh;
margin: 0 auto;
padding-left: 20px;
padding-right: 20px;
background-size: 20px 20px;
background-color: #f7ddb1;
background-image:
    linear-gradient(to right, rgba(128, 128, 128, 0.367) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(128, 128, 128, 0.367) 1px, transparent 1px);
`
