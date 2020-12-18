import React from 'react';
import { Row, Wrapper, Button, Copy, Bold } from 'app/NativeComponents/common';

const TabButton = (props) => {

  return (
    <Row>
      <Button onPress={props.onPress} style={{
        padding: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 30,

        backgroundColor: props.active_tab === props.slug ? props.colors ? props.colors.gray_color : "transparent" : "transparent"
      }}>
        <Copy>
          <Bold>
            {props.title}
          </Bold>
        </Copy>
      </Button>
    </Row>
  )
}


export default TabButton;
