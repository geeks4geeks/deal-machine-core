
import React from 'react';

import {
  Wrapper,
  Copy,
  Bold,
  Row,
  Icon,
  Button,
  Card
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';

const renderRemove = (props) => {
  if(props.edit_modal.can_remove){
    return(
      <Button onPress={()=>{
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
      }} style={{outline: "none", borderWidth: 0, padding: 0, margin: 0, marginRight: 15, alignItems: "center", justifyContent: "center"}}>
        <Row>
          <Icon
            icon="delete"
            color={props.colors.error_color}
            size={18}
            style={{marginRight: 5}}
          />
          <Copy style={{color: props.colors.error_color}}>
            {props.edit_modal.remove_button_text}
          </Copy>
        </Row>
      </Button>
    )
  }
}

const Footer = (props) => {

  if(props.checkIfNeedsToSave()){
    return (
      <Row style={{
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: props.colors.background_color,
      }}>
        <PillButton primary={true} onPress={()=>{
          props.saveInfo();
        }} formButton>
          {props.edit_modal.save_button_text}
        </PillButton>
      </Row>

    )
  }

  return (
    <Row style={{
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: props.colors.background_color
    }}>
      {renderRemove(props)}

      <Wrapper style={{outline: "none", borderWidth: 0, padding: 0, margin: 0}}>
        <Card style={{
          padding: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 20,
          backgroundColor: props.colors.gray_color
        }}>
          <Row>
            <Copy style={{color: props.colors.white_text_color}}>
              <Bold>{props.edit_modal.save_button_text}</Bold>
            </Copy>
          </Row>
        </Card>
      </Wrapper>
    </Row>

  );


}



export default Footer;
