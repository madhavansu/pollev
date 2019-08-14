import React from 'react';
import {Link} from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/database";
import {PollContext} from '../index';

class GetAllPolls extends React.Component {

  constructor(props, context){
    super(props, context)
    this.state = {
      isLoading : true,
      snapshot : [],
      showData: false
    }
    this.openPoll = this.openPoll.bind(this);
  }

  componentDidMount() {
    const rootRef = firebase.database().ref("anzpollevweb");
    rootRef.on('value', snapshot => {
      let snapshotValue = Object.keys(snapshot.val());
      if(snapshotValue.length > 0) {
        
        this.setState({
          snapshot : snapshotValue,
          isLoading : false,
          showData : true
        });

        this.state.snapshot.forEach((item) => {
          console.log(item);
        });

      } else {
        this.setState({
          isLoading : false,
          showData: false
        });
      }
    });
  }

  openPoll(poll) {
    // alert(poll);
    this.props.setCurrentPoll(poll);
    // this.context.router.history.push("/polllist");
    // this.props.history.push('/polllist');
  }

  render() {
    return (
      <div className="pagecenter">
        <br/><hr/>
        <p className="text-sub-title">Recent events</p>
        {
          // this.state.showData ?
          //   (this.state.isLoading ? 
          //     <Spinner animation="border" variant="secondary" /> : 
          //     this.state.snapshot.forEach((pollitem) => <Link to={{ pathname: '/polllist', pollevent: { eventName: pollitem} }}>{pollitem}</Link>)
          //   ) : ""
          this.state.snapshot.map((value, key) => 
            // <Button key={key} variant="link" onClick={() => this.openPoll(value)}>{value}</Button>)
            <p key={key}><Link onClick={() => this.openPoll(value)} to={{ pathname: '/polllist' }}>{value}</Link></p>)
          
        }
      </div>
    );
  }
}

export default props => ( <PollContext.Consumer>
  {({currentPoll, setCurrentPoll}) => {
     return <GetAllPolls {...props} currentPoll={currentPoll} setCurrentPoll={setCurrentPoll} />
  }}
</PollContext.Consumer>)