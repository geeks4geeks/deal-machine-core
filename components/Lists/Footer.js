
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


const Footer = (props) => {

  if(!props.isMobile && props.list_modal.popoverTarget){
    if(props.lists.length > 0){
      if(props.selected_lists.length > 0 ||
        props.list_modal.type === "edit_lists_for_lead" ||
        props.list_modal.type === "filter_lists_for_leads"
      ){

        return (
          <Row style={{
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: props.colors.background_color,
          }}>
            <PillButton primary={true} onPress={()=>{
              props.confirmUpdate();
            }} formButton style={{outline: "none", borderWidth: 0, padding: 0}}>
              {props.renderRightButtonText()}
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
                  <Bold>{props.renderRightButtonText()}</Bold>
                </Copy>
              </Row>
            </Card>
          </Wrapper>
        </Row>

      );
    }
  }
  return <Wrapper style={{height: 39}}/>


}



export default Footer;
