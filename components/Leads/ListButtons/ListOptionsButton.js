import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon,
  Row,
  Copy
} from 'app/NativeComponents/common';

const ListOptionsButton = (props) => {

  if(!props.isMobile){
    return (
      <Button onPress={()=>{
        //toogle map options state
        props.appRedirect({redirect: "leadoptions", payload: {active_property: props.active_property, page_id: props.page_id}});
      }}>
        <Card style={{
          borderRadius: 20,
          height: 30,
          marginLeft: 0,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Wrapper style={{
            padding: 0,
            paddingRight: 15,
            paddingLeft: 15,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Row style={{
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon
                icon={"view-column"}
                size={18}
                style={{
                  marginRight: 5
                }}
              />
              <Copy>Edit Columns</Copy>
            </Row>
          </Wrapper>
        </Card>
      </Button>
    )
  }

  return <Wrapper />
}



export default ListOptionsButton;
