
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

  if(!props.isMobile && props.status_modal.popoverTarget != null){
    if(props.selected_status && props.selected_status !== 0){

      return (
        <Row style={{
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: props.colors.background_color
        }}>
          <PillButton primary={true} onPress={()=>{
            props.confirmUpdate();
          }} formButton>
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
                icon="check"
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

  return <Wrapper />;

}



export default Footer;
