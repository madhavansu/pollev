import React from 'react';

export default class StaticContentHeader extends React.Component {
  render() {
    return (
          <div className="pagecenter">
            <p className="pagetitle align-center">ANZ Poll</p>
            <br/>
            {
              this.props.admin
              ? <p className="text-sub-title">Create a presentation</p>
              : <p className="text-sub-title">Join a presentation</p>
            } 
            
            
          </div>
    );
  }
}