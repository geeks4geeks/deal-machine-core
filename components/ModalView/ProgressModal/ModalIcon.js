import React, { Component } from 'react';
import {
  Wrapper,
  Icon,
  ExternalImage
} from 'app/NativeComponents/common';

class ModalIcon extends Component {


  render() {

    if(this.props.uploaded){
      return (
        <Wrapper style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            color={this.props.colors.active_color}
            icon={"check"}
            size={44}
          />
        </Wrapper>
      );
    }

    return (
      <Wrapper style={{
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon
          color={this.props.colors.error_color}
          icon={"error"}
          size={44}
        />
      </Wrapper>
    );

  }
}


export default ModalIcon;
