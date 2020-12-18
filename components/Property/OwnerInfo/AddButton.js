
import React from 'react';

import {
  Button,
  Row,
  Icon,
  Copy
} from 'app/NativeComponents/common';

const AddButton = (props) => {

  return (
    <Button
    onPress={props.onPress}

    style={{
      borderRadius: 5, padding:10, paddingTop: 5, paddingBottom: 5, margin: 0, marginRight: 15,
      borderWidth: 1, borderColor: props.colors.border_color, minHeight: 50, borderStyle: "dashed", alignItems: "center", justifyContent: "center"
    }}>
      <Row>
        <Icon
          style={{
            marginRight: 5
          }}
          icon="add"
        />
        <Copy style={{
          whiteSpace: "nowrap"
        }}>{props.title}</Copy>
      </Row>
    </Button>
  )


}



export default AddButton;
