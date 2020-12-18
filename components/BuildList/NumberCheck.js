import React, { Component } from "react";

import { Wrapper, Copy, Bold, Icon } from "app/NativeComponents/common";

class NumberCheck extends Component {


  render() {
    if(!this.props.isMobile){
      if(this.props.is_successful){
        return (
          <Wrapper style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            margin: 10,
            marginTop: 5,
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: this.props.colors.success_color
          }}>
            <Icon
              icon="check"
              size={18}
              color={this.props.colors.white_text_color}
            />
          </Wrapper>
        )
      }
      return (
        <Wrapper style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          margin: 10,
          marginTop: 5,
          marginRight: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.colors.gray_color
        }}>
          <Copy><Bold>{this.props.number}</Bold></Copy>
        </Wrapper>
      )
    }

    return <Wrapper />
  }
}


export default NumberCheck;
