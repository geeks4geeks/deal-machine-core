import React, { Component } from 'react';
import {
  Wrapper,
  ExternalImage,

} from 'app/NativeComponents/common';

class RouteImage extends Component{

  render(){
    if(this.props.route.image && this.props.route.image != '' ){
      return (
        <ExternalImage
          style={{
            width: 60,
            height: "auto",
            alignSelf: "stretch",
            borderTopLeftRadius: 5,
            borderBottomLightRadius: 5,

          }}
          image={this.props.route.image}
        />

      )
    }

    return (
      <Wrapper style={{
        width: 60,
        height: "auto",
        alignSelf: "stretch",
        backgroundColor: this.props.background,
        alignItems: "center",
        justifyContent: "center"
      }}>

      </Wrapper>
    )
  }

}

export default RouteImage;
