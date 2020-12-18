
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
  if(!props.isMobile){
    if(props.all_tags.length > 0){
      if(props.selected_tags.length > 0 ||
        props.tag_modal.type === "edit_tags_for_lead"
      ){

        return (
          <Row style={{
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: props.colors.background_color,
          }}>
            <PillButton onPress={()=>{
              props.confirmUpdate();
            }} formButton >
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

                <Icon
                  icon={"check"}
                  color={props.colors.white_text_color}
                  size={18}
                  style={{marginRight: 5}}
                />
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
