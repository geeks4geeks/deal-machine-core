import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';

import BottomButtons from './BottomButtons';

class DrawingMapFooter extends Component {

  render() {

    return (
      <Wrapper
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          marginBottom: 0,
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Wrapper style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: this.props.iosBrowser ? 120 : 5
        }}>
          <BottomButtons {...this.props}/>
        </Wrapper>

      </Wrapper>
    );
  }
}

export default DrawingMapFooter;
