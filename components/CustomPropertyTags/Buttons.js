import React, { Component } from 'react';

import {
  Card,
  Row
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){
    return (
      <Row style={{justifyContent: "center"}}>
        <PillButton
          primary={true}
          onPress = {()=>{this.props.appRedirect({redirect: "createTag"})}}>
          Create Property Tag
        </PillButton>
      </Row>
    )
  }
}

export default Buttons;
