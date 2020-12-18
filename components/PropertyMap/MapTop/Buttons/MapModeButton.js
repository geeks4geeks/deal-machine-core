import React from 'react';
import {
  Wrapper,
  Button,
  Card,
  Row,
  Icon,
  Copy,
  Bold
} from 'app/NativeComponents/common';

const renderButtonText = (props) =>{

  switch(props.map_mode){
    case "pin":
    default:
      return(
        <Row>
          <Copy><Bold>{ 'Pin Mode' }</Bold></Copy>
          <Icon
            fa_icon={"sort"}
            color={props.colors.light_text_color}
            size={12}
            style={{
              marginLeft: 10
            }}
          />
        </Row>
      )
    break;

    case "glide":
      return(
        <Row>
          <Copy><Bold>{ 'Crosshairs Mode' }</Bold></Copy>
          <Icon
            fa_icon={"sort"}
            color={props.colors.light_text_color}
            size={12}
            style={{
              marginLeft: 10
            }}
          />
        </Row>
      )
    break;

    case "tap_to_add":
      return(
        <Row>
          <Copy><Bold>Tap-To-Add Mode</Bold></Copy>
          <Icon
            fa_icon={"sort"}
            color={props.colors.light_text_color}
            size={12}
            style={{
              marginLeft: 10
            }}
          />
        </Row>
      )
    break;
  }
}

const MapModeButton = (props) => {

  if(props.plan_module_info){
    if(props.plan_module_info.has_module || props.user.team_clearance_level == 0){

      return (
          <Button onPress={()=>{
            props.toggleActionSheet("switch_map_mode")
          }}>
            <Card style={{
              borderRadius: 20
            }}>
              <Wrapper style={{
                padding: 5,
                paddingRight: 15,
                paddingLeft: 15
              }}>
                {renderButtonText(props)}
              </Wrapper>
            </Card>
          </Button>
      );
    }
  }

  return <Wrapper />;

}


export default MapModeButton;
