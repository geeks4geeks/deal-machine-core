import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, Row } from 'app/NativeComponents/common';

import { RemoveTextButton, PillButton } from 'app/NativeComponents/snippets';

class Buttons extends Component{


  render(){
    if(this.props.checkIfNeedsToSave()){
      return (
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
            primary={true}
            onPress={()=>this.props.saveNote()}
          >
            Save Note
          </PillButton>
        </Row>
      );
    }
    if(this.props.user.team_clearance_level > 0 || this.props.user.id == this.props.originalNote.user_id){
      return (
        <Wrapper>
          <RemoveTextButton
            text="Remove Note"
            onPress={()=>{
              this.props.toggleActionSheet("delete_note");
            }}
          />
        </Wrapper>
      )
    }

    return <Wrapper />
  }


}

export default Buttons;
