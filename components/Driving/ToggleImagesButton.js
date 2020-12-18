import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon,
  Row,
  Copy,
  CardBody
} from 'app/NativeComponents/common';

const ToggleImagesButton = (props) => {

  return (
    <Card style={{
      borderRadius: 30,
      marginRight: 0
    }}>
    <Row style={{height: 30}}>
        <Button onPress={()=>{
          props.toggleDrivingImages(true)
        }}
        style={{
          alignItems: "center",
          justifyContent:"center",
          backgroundColor: props.toggle_driving_images ? props.colors.card_color : props.colors.gray_color,
          borderRightWidth: 1,
          borderRightColor: props.colors.border_color,
          borderRigthStyle: "solid",
          borderTopLeftRadius:30,
          borderBottomLeftRadius:30,
          height: 30
        }}
        >
          <CardBody style={{padding: 0,
          paddingLeft: 15,
          paddingRight: 10,}}>
            <Row>
              <Icon
                fa_icon={"image"}
                size={18}
              />
            </Row>
          </CardBody>
        </Button>

        <Button onPress={()=>{
          props.toggleDrivingImages(false)
        }}
        style={{
          alignItems: "center",
          justifyContent:"center",
          backgroundColor: !props.toggle_driving_images ? props.colors.card_color : props.colors.gray_color,
          borderTopRightRadius:30,
          borderBottomRightRadius:30,
          height: 30
        }}
        >
        <CardBody style={{padding: 0,
        paddingLeft: 10,
        paddingRight: 15,}}>
            <Row>
              <Icon
                icon={"view-stream"}
                size={18}
              />
            </Row>
          </CardBody>
        </Button>
      </Row>
    </Card>
  )

}



export default ToggleImagesButton;
