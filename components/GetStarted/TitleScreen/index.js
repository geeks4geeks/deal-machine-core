import React, { Component } from 'react';
import { Wrapper, Title } from 'app/NativeComponents/common';

import Slogan from './Slogan';
import Buttons from './Buttons';

class TitleScreen extends Component{


  render(){
    return (
      <Wrapper style={{
        flex: 1
      }}>
        <Slogan {...this.props} />
        <Buttons {...this.props} />
      </Wrapper>
    );
  }

}

export default TitleScreen;
