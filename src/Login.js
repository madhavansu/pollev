import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {

    e.preventDefault();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        console.log("signin here")
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          // if (res.user) 
          Auth.setLoggedIn(true);
          history.push('/')
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  
  };

  const createUser = () => {
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          Auth.setLoggedIn(true)
          history.push('/')
          // if (res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { 
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
        Auth.setLoggedIn(true)
        history.push('/')
      })
      .catch(e => setErrors(e.message))
    })
   
  }
  return (
    <div className="pagecenter">

        <p className="pagetitle align-center">Login</p>
        <Form className="pagecenter" onSubmit={e => handleForm(e)}>
          <Form.Group controlId="formPlaintextQuery">
            <Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
            </Form.Label>
            <br/>
            <Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            </Form.Label>
            <br/>
            <Form.Label>
              <Button variant="outline-primary" type="submit">Login</Button>
            </Form.Label>
            &nbsp;&nbsp;&nbsp;
            <Form.Label>
              <Button variant="outline-primary" type="button" onClick={() => createUser()} >Join</Button>
            </Form.Label>
            <br/>
            <div>OR</div>
            <Form.Label>
              <Button variant="outline-primary" onClick={() => signInWithGoogle()} className="googleBtn" type="button">Login With Google</Button>
            </Form.Label>
          </Form.Group>
          <div>{error}</div>
        </Form>

      {/* <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />
        <button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button type="submit">Login</button>
        <span>{error}</span>
      </form> */}
    </div>
  );
};

export default withRouter(Login);