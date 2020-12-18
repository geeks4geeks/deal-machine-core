import React from 'react';
import {
  Wrapper,
  Button,
  Icon
} from 'app/NativeComponents/common';

import {
  dismissMobileKeyboard
} from 'app/NativeActions'

const MoreButton = (props) =>{

  return(
    <Button onPress={()=>{
      props.toggleActionSheet("map_more");
      dismissMobileKeyboard();
    }}
      style={{
        width: 50,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Icon
        icon={"more-vert"}
        size={26}
      />
    </Button>
  );

  return <Wrapper />

}


export default React.memo(MoreButton);
