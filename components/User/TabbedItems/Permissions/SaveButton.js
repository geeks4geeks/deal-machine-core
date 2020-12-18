import React, { Component } from 'react';

import {
  Row,
  Wrapper
} from 'app/NativeComponents/common';
import {
  PillButton
} from 'app/NativeComponents/snippets';

class SaveButton extends Component{

  render(){

    if(this.props.checkIfNeedsToSave()){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton primary={true} onPress={()=>this.props.savePermissions()}>
            Save Permissions
          </PillButton>
        </Row>
      );
    }

    return <Wrapper />
  }

}

export default SaveButton;
