import React from 'react';
import {
  Button,
  Wrapper,
  Card,
  Icon,
  Row,
  Copy
} from 'app/NativeComponents/common';

const MobileSelectAll = (props) => {

  return (
    <Button onPress={()=>{props.selectAllLeadsInAccount()}}>
      <Card style={{
        borderRadius: 20,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 0
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
            <Copy>Select All</Copy>
          </Row>
        </Wrapper>
      </Card>
    </Button>
  )

}



export default MobileSelectAll;
