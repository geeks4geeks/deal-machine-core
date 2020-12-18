import React from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

const CancelButton = (props) => {

  if(props.end_route_info.properties_added == 0){
    return (
      <TextButton
        onPress={()=>props.acknowledgeEndRoute()}
        text={"No, I want to keep this drive"}
      />
    );
  }
  return <Wrapper />
}


export default CancelButton;
