import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Form from './components/Form'
import OpenAIAPI from "react-openai-api";

class App extends Component {
  render() {
    return (<div>
      <h2>Welcome to</h2>
      <Form/>
      </div>
    );
    

    }
}

export default App;
