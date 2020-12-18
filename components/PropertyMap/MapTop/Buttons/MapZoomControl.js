import React from 'react';

import {
  Button,
  Wrapper,
  Card,
  Icon,
  Copy,
  Row,
  Bold
} from 'app/NativeComponents/common';

const MapZoomControl = (props) => {

  if(props.device == "desktop" &&
    !props.isMobile){
    return(
      <Card style={{
        borderRadius: 20,
        padding: 5,
        paddingRight: 15,
        paddingLeft: 15,
        marginLeft: 0
      }}>
          <Row>
          <Button onPress={()=>{props.handleZoomControl("zoom-in")}}>
            <Icon
              icon={"add"}
              size={18}
              style={{
                marginRight: 5,
                fontWeight: 'bold'
              }}
            />
            </Button>
            <Button onPress={()=>{props.handleZoomControl("zoom-out")}}>
            <Icon
              icon={"remove"}
              size={18}
              style={{
                marginLeft: 5,
                fontWeight: 'bold'
              }}
            />
            </Button>
          </Row>
      </Card>
  );
  }
  return <Wrapper />

}

export default MapZoomControl;
