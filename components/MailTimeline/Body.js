import React, { Component } from 'react';
import { Wrapper, Scroll } from 'app/NativeComponents/common';

import AddressItem from './AddressItem';

class Body extends Component{


  render(){
    return (
      <Scroll>
        {
          this.props.mail_timeline.map((address, i) => {
            return <AddressItem address={address} key={i} />
          })
        }
      </Scroll>
    );

    return <Wrapper />
  }

}

export default Body;
