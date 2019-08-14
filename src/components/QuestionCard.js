import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import uparrow from "../assets/images/uparrow.svg";
import downarrow from "../assets/images/downarrow.svg";
import unhidedisabled from "../assets/images/unhide-disabled.svg";
import unhideenabled from "../assets/images/unhide-enabled.svg";
import { AuthContext } from "../index";

import * as firebase from "firebase/app";
import "firebase/database";

export default class QuestionCard extends React.Component {
  // static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      upvote: this.props.item.upvote,
      downvote: this.props.item.downvote,
      reference: this.props.reference,
      question: this.props.item.question,
      datetime: this.props.item.datetime,
      hid: this.props.item.hidden
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.update = this.update.bind(this);
    this.hideQuestions = this.hideQuestions.bind(this);
    this.unHideQuestions = this.unHideQuestions.bind(this);
  }

  upvote() {
    // alert("up");
    this.setState({
      upvote: Math.abs(this.state.upvote) + 1
    });
    this.update();
  }

  downvote() {
    this.setState({
      downvote: Math.abs(this.state.downvote) + 1
    });
    this.update();
  }

  hideQuestions() {
    // alert("true");
    this.setState({
      hid: true
    });
    this.update();
  }

  unHideQuestions() {
    // alert("false");
    this.setState({
      hid: false
    });
    this.update();
  }

  update() {
    const rootRef = firebase.database().ref("anzpollevweb").child(this.props.currentPoll);
    var postData = {
      question: this.state.question,
      upvote: this.state.upvote,
      downvote : this.state.downvote,
      datetime : this.state.datetime,
      hidden : this.state.hid
    };

    // Get a key for a new Post.
    // var newPostKey = rootRef.push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[this.state.reference] = postData;
    console.log("begin");
    console.log(updates);
    console.log("end");
    rootRef.update(updates);
  }

  render() {
    // const {isLoggedIn} = this.context;

    return (
      <AuthContext.Consumer>
        {({isLoggedIn}) => (
          (!this.state.hid || isLoggedIn) 
          ? <Row>
            <Col sm="11">
              <Card body> 
                <Row>
                  <Col className="vertical-center vote-col">
                    {this.state.upvote - this.state.downvote}
                  </Col>
                  <Col sm="1" className="vertical-center">
                    <div>
                      <div><Image src={uparrow} onClick={this.upvote} /></div>
                      <div><Image src={downarrow} onClick={this.downvote} /></div>
                    </div>
                  </Col>
                  <Col sm="10">
                      {this.state.question}
                  </Col>
                  <div className="vertical-center vote-col">
                    {
                      isLoggedIn
                      ? <div>
                          {
                            this.state.hid
                            ? <Image src={unhideenabled} onClick={this.unHideQuestions} />
                            : <Image src={unhidedisabled} onClick={this.hideQuestions} />
                          }
                        </div>
                      : ""
                    }
                    
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
          : ""
        )}
        </AuthContext.Consumer>
    );
  }
}

// QuestionCard.contextType = AuthContext;