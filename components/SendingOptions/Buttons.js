import React, { Component } from 'react';
import { Wrapper, Card, Row } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){

    if(this.props.select_default_sending_options){
      if(this.props.checkIfNeedsToSave()){
        return (
          <Row style={{justifyContent: "flex-end"}}>
            <PillButton
            primary={true} onPress={()=>this.props.saveOptions()}>
              {this.props.onboarding ? "Complete Account Setup" : "Update Default Options"}
            </PillButton>
          </Row>
        )
      }
    }

    if(this.props.checkIfNeedsToSave()){
      return (
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
          primary={true} onPress={()=>this.props.saveOptions()}>
            Update Mailing Options
          </PillButton>
        </Row>
      )
    }

    return <Wrapper />
  }
}

export default Buttons;
