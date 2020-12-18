import React, { Component } from 'react';
import {
  Wrapper,
  Icon,
  ExternalImage
} from 'app/NativeComponents/common';

class ModalIcon extends Component {


  render() {

    if(this.props.image && this.props.image != ""){
      return (
        <Wrapper style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ExternalImage
            image={this.props.image}
            contain
            style={{
              height: 60,
              width: "100%",
              resizeMode: "contain"
            }}
          />
        </Wrapper>
      );
    }else if(this.props.icon && this.props.icon != ""){
      return (
        <Wrapper style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            icon={this.props.icon}
            size={44}
          />
        </Wrapper>
      );
    }

    return <Wrapper />
  }
}


export default ModalIcon;
