import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon
} from 'app/NativeComponents/common';

const MapOptionsToggleButton = (props) => {

  return (
    <Button onPress={()=>{
      //toogle map options state
      props.appRedirect({redirect: "mapOptions"});
    }}>
      <Card style={{
        borderRadius: 20,
        marginLeft: 0
      }}>
        <Wrapper style={{
          padding: 5,
          paddingRight: 15,
          paddingLeft: 15,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            icon={"map"}
            size={18}
          />
        </Wrapper>
      </Card>
    </Button>
  )

}



export default MapOptionsToggleButton;
