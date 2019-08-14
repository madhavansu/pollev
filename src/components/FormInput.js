import React from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/database";

export default class FormInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.updatePoll = this.updatePoll.bind(this);
  }

  handleChange(event) {
    this.setState({question: event.target.value});
  }

  // handleSubmit(event) {
  //   alert('An essay was submitted: ' + this.state.question);
  //   event.preventDefault();
  // }

  // updatePoll(question, upvote, downvote, datetime) {
  updatePoll(event) {
    const rootRef = firebase.database().ref("anzpollevweb").child(this.props.eventname);
    let d = new Date();
    var postData = {
      question: this.state.question,
      upvote: "0",
      downvote : "0",
      datetime : d.toDateString(),
      hidden: false
    };

    // Get a key for a new Post.
    var newPostKey = rootRef.push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[newPostKey] = postData;
    rootRef.update(updates);
    this.setState({question: ""});
    event.preventDefault();
  }
  
  render() {
    return (
      <Form>
        <Form.Group as={Row} controlId="formPlaintextQuery">
          <Form.Label column sm="11">
            <Form.Control as="textarea" rows="2" value={this.state.question} onChange={this.handleChange} />
          </Form.Label>
          <Form.Label column sm="1">
            <Button variant="outline-secondary" onClick={this.updatePoll}>Submit</Button>
          </Form.Label>
        </Form.Group>
      </Form>
    );
  }
}