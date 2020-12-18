import React, { Component } from 'react';
import { Wrapper, Row } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{

  render(){
    if(this.props.checkIfNeedsToSave()){
      return (
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton primary={true}
            onPress={()=>this.props.saveEmail()}
          >
            Change Email
          </PillButton>
        </Row>
      )
    }

    return <Wrapper />
  }

}

export default Buttons;
