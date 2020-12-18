import React, { Component } from 'react';

import {
  Wrapper,
  ExternalImage
} from 'app/NativeComponents/common';

class BadgeIcon extends Component{



  render(){
    return(
      <Wrapper style={{
        justifyContent:"center",
        position: "relative",
        alignSelf: "stretch",
        padding:10,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: this.props.colors.background_color
      }}>
        <Wrapper style={{
          backgroundColor: this.props.colors.white_color,
          borderRadius: 100
        }}>

          <ExternalImage
            style={this.props.style}
            image={this.props.image}
          />
        </Wrapper>
      </Wrapper>
    )
  }
}

export default BadgeIcon;
