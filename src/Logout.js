import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {

    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .signOut()
    .then(() => { 
      history.push('/login')
      Auth.setLoggedIn(false)
    })
    .catch(function(e) {
      setErrors(e.message);
    });
  
  };

  const signOutWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .signOut()
    .then(() => { 
      history.push('/login')
      Auth.setLoggedIn(false)
    })
    .catch(function(e) {
      setErrors(e.message);
    });
   
  }
  return (
    <div>
      <h1>Logout</h1>
      <form onSubmit={e => handleForm(e)}>
        <button onClick={() => signOutWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Logout With Google
        </button>
        <button type="submit">Logout</button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default withRouter(Login);