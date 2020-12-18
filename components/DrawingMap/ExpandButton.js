import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon
} from 'app/NativeComponents/common';

const ExpandButton = (props) => {
  if(props.device == "desktop"){
    if(props.expand_map){
      return (
        <Button onPress={()=>{
          props.expandMap(false)
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
                fa_icon={"compress"}
                size={18}
              />
            </Wrapper>
          </Card>
        </Button>
      )
    }

    return (
      <Button onPress={()=>{
        props.expandMap(true)
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
              fa_icon={"expand"}
              size={18}
            />
          </Wrapper>
        </Card>
      </Button>
    )
  }

  return <Wrapper />

}



export default ExpandButton;
