import React, { useState, useContext } from "react";
// import { Navbar, Image, Form } from 'react-bootstrap';
import { AuthContext } from "../index";
import * as firebase from 'firebase'
import { Link, withRouter } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import {Navbar, Nav, NavItem, Image, Button } from 'react-bootstrap';

const NavigationHeader = ({history}) => {
  const [error, setErrors] = useState("");

  const {isLoggedIn} = useContext(AuthContext);
  const Auth = useContext(AuthContext);

  console.log(firebase);

  const signOut = () => {
      // const provider = new firebase.auth.GoogleAuthProvider();
      firebase
      .auth()
      .signOut()
      .then(() => { 
        history.push('/login')
        Auth.setLoggedIn(false)
    }).catch(function(e) {
      setErrors(e.message);
      alert(error);

    });
  }

  const signOutWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .signOut()
    .then(() => { 
      history.push('/')
      Auth.setLoggedIn(false)
    })
    .catch(function(e) {
      setErrors(e.message);
    });
   
  }
  
  return (
    
    <Navbar bg="primary" className="pagecenter anz-header" variant="dark">
      <Navbar.Brand href="/"><Image className="mr-auto" src={logo} fluid/></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="paddingRight20px">
            <Link to='/'>Home</Link>
        </Navbar.Text>
        <Navbar.Text>
          {
            isLoggedIn
              ? <Button variant="link" onClick={() => signOutWithGoogle()}>Logout</Button>
              : <Link to='/login'>Login</Link>
          }
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>

      // <Navbar bg="primary" className="anz-header" variant="dark">
      //   {/* <Image className="mr-auto" src={logo} fluid/> */}
      //   <Form inline className="vertical-center" >
      //     <Form.Label className="mr-sm-2" >
      //     {
      //       isLoggedIn
      //         ? <p>Hello, Madhavan <button variant="link" onClick={signOut}>Logout</button></p>
      //         : <p><Link to='/login'>Login</Link></p>
      //     }
      //     </Form.Label>
      //   </Form>
      // </Navbar>
  )
}

export default withRouter(NavigationHeader);