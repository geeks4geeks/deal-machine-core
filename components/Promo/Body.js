import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import Inputs from './Inputs';
import Buttons from './Buttons';

class Body extends Component{


  render(){
    return (
      <Wrapper>
        <Inputs {...this.props} />
        <Buttons {...this.props} />
      </Wrapper>
    );
  }

}

export default Body;
