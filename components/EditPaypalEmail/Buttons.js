import React, { Component } from 'react';
import { Wrapper, Card, Row } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){
    if(this.props.checkIfNeedsToSave()){
      return (

        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
            primary={true}
            onPress={()=>this.props.savePartnerInfo()}
          >
          Change Paypal Email
          </PillButton>
        </Row>
      )
    }

    return <Wrapper />
  }

}

export default Buttons;
