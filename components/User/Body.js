import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import UserProfile from './UserProfile';
import TabbedItems from './TabbedItems';
class Body extends Component {


  render(){


    return(
      <Wrapper>
        <UserProfile
          {...this.props}
        />
        <TabbedItems {...this.props}/>
      </Wrapper>
    )
  }
}


export default Body;
