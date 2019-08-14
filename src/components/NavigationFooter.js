import React from 'react';
import { Navbar, Form } from 'react-bootstrap';

export default class NavigationFooter extends React.Component {
  render() {
    return (
        <Navbar bg="primary" fixed="bottom" className="pagecenter anz-footer" variant="dark">
          <Navbar.Text>
            © Australia and New Zealand Banking Group Limited (ANZ) 2019 ABN 11 005 357 522.
          </Navbar.Text>
        </Navbar>
    );
  }
}