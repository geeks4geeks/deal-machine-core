
import React from 'react';

import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  RemoveTextButton
} from 'app/NativeComponents/snippets';


const RemoveButton = (props) => {
  if(!props.checkIfNeedsToSave() && props.edit_modal.can_remove && (!props.edit_modal.popoverTarget || props.device !== "desktop")){
    return (
      <RemoveTextButton
        text={props.edit_modal.remove_button_text}
        onPress={()=>{
          props.setModal({
            title: props.edit_modal.remove_button_text,
            description: props.edit_modal.remove_button_description,
            icon: "",
            submit: props.edit_modal.remove_button_text,
            buttonType: "destroy",
            onPress: props.edit_modal.removeAction,
            cancel: 'Cancel',
            onCancel: ()=>{}
          });
          props.toggleModal({show: true, type: "normal"});
        }}
      />
    )
  }

  return <Wrapper />

}



export default RemoveButton;
