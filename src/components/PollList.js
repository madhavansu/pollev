import React from 'react';
import { Spinner } from 'react-bootstrap';
import FormInput from './FormInput';
import QuestionCard from './QuestionCard';
import * as firebase from "firebase/app";
import "firebase/database";
import { AuthContext, PollContext } from "../index";
import { Redirect } from 'react-router';

class PollList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading : true,
      snapshot : [],
      firebaseRef: null,
      showData: false
    }
  }

  componentDidMount() {
    console.log("pp:" +this.props.currentPoll);
    const rootRef = firebase.database().ref("anzpollevweb").child(this.props.currentPoll);
    rootRef.on('value', snapshot => {
      if(snapshot.numChildren() > 0) {
        
        this.setState({
          snapshot : snapshot.val(),
          isLoading : false,
          firebaseRef : rootRef,
          showData : true
        });

        Object.keys(this.state.snapshot).map((value, key) => console.log("value " + this.state.snapshot[value] + " key " + key));

      } else {
        this.setState({
          isLoading : false,
          firebaseRef : rootRef,
          showData: false
        });
      }
    });
    
  }

  render() {
    if (this.props.currentPoll === ""){
        return <Redirect to="/" />;
    }
    return (
      <AuthContext.Consumer>
        {({isLoggedIn}) => (
          <div className="pagecenter">
            <p className="pagetitle">ANZ Poll</p>
            <p className="text-sub-title">Responding as {isLoggedIn? "Guest": "Madhavan"}</p>
            {/* <FormInput eventname = "unconference" /> */}
            <FormInput eventname = {this.props.currentPoll} />
            {
              this.state.showData ?
                (this.state.isLoading ? 
                  <Spinner animation="border" variant="secondary" /> : 
                  Object.keys(this.state.snapshot).map((value, key) => <QuestionCard key={key} reference={value} currentPoll={this.props.currentPoll} item={this.state.snapshot[value]} />)
                ) : ""
            }
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default props => ( <PollContext.Consumer>
  {({currentPoll, setCurrentPoll}) => {
     return <PollList {...props} currentPoll={currentPoll} setCurrentPoll={setCurrentPoll} />
  }}
</PollContext.Consumer>
)