import React, { Component } from 'react';
import { Wrapper, Card, Row } from 'app/NativeComponents/common';
import { RemoveTextButton, PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){

    return (
      <Row style={{justifyContent: "flex-end"}}>
        <PillButton
          primary={true}
          onPress={()=>this.props.addProperty()}
        >
          Add Lead From Address
        </PillButton>
      </Row>
    );

  }

}

export default Buttons;
