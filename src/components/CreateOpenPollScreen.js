import React, { useState, useContext } from 'react';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import StaticContentHeader from './StaticContentHeader';
import { PollContext, AuthContext } from "../index";

import * as firebase from "firebase/app";
import "firebase/database";
import GetAllPolls from './GetAllPolls';

const CreateOpenPollScreen = ({history}) => {
  const [eventName, setEventName] = useState("");
  // const [error, setErrors] = useState("");
  const rootRef = firebase.database().ref("anzpollevweb");

  // const {isLoggedIn} = useContext(AuthContext);
  const {currentPoll, setCurrentPoll} = useContext(PollContext);

  const {isLoggedIn} = useContext(AuthContext);

  const gotoPollList = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    
    setCurrentPoll(eventName);

    history.push({
      pathname: '/polllist'
    })
  }

  const createPoll = () => {
    console.log(eventName);
    var updates = {};
    updates[eventName] = eventName;
    rootRef.update(updates);

    setCurrentPoll(eventName);
    
    history.push({
      pathname: '/polllist'
    })
  }

  return (
    <div className="pagecenter">
      <StaticContentHeader admin={isLoggedIn} />
      <Form className="pagecenter">
        <Form.Group as={Row} controlId="formPlaintextQuery">
          <Form.Label column sm="11">
            <Form.Control type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="event name" />
          </Form.Label>
          <Form.Label column sm="1">
            {
              isLoggedIn
              ? <Button className="button-outline" variant="outline-primary" onClick={createPoll}>Create</Button>
              : <Button className="button-outline" variant="outline-primary" onClick={gotoPollList}>Join</Button>
            }
          </Form.Label>
        </Form.Group>
      </Form>
      {
        isLoggedIn
        ? <GetAllPolls />
        : ""
      }
      
    </div>
  );
}


export default CreateOpenPollScreen;