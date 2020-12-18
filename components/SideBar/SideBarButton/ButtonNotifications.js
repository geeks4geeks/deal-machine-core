import React, { Component } from 'react';
import {
  Wrapper,
  Copy,
  Bold
} from 'app/NativeComponents/common';

class ButtonNotifications extends Component{


  render(){
    if(this.props.notifications && this.props.notifications > 0){
      return (
        <Wrapper style={{
          backgroundColor: this.props.colors.error_color,
          borderRadius: 15,
          width: 26,
          height: 26,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Copy style={{
            textAlign: "center",
            color: this.props.colors.white_text_color,
            lineHeight: 26
          }}>
            <Bold>
              {this.props.notifications}
            </Bold>
          </Copy>
        </Wrapper>
      );
    }

    return <Wrapper />

  }

}

export default ButtonNotifications;
