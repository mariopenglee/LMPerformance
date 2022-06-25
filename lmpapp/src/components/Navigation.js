import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'

class Navigation extends Component {
  render(){
    return (
      <div>
        <Navbar bg="dark" variant="dark" sticky="top" expand="md" collapseOnSelect>
        <Navbar.Brand href="/">
        <img src={logo} width="50px" />
        Language Model Performance
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="product-description"> Product Description </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation
