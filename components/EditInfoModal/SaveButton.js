
import React from 'react';

import {
  Wrapper,
  Copy,
  Bold,
  Row,
  Button,
  Card
} from 'app/NativeComponents/common';
import {
PillButton
} from 'app/NativeComponents/snippets';


const SaveButton = (props) => {
  if(props.checkIfNeedsToSave() && (!props.edit_modal.popoverTarget || props.device !== "desktop")){
    return (
      <Row style={{
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20
      }}>
        <PillButton primary={true} onPress={()=>{
          props.saveInfo();
        }} formButton style={{outline: "none", borderWidth: 0}}>
          {props.edit_modal.save_button_text}
        </PillButton>
      </Row>

    )
  }

  return <Wrapper />

}



export default SaveButton;
