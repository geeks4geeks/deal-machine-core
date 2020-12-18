import React from 'react';
import {
  Wrapper,
  Card,
  PrimaryButton,
  DeleteButton
} from 'app/NativeComponents/common';

const SubmitButton = (props) => {

  if(props.end_route_info.properties_added > 0){

    return(
      <Card>
        <PrimaryButton
          onPress={()=>props.acknowledgeEndRoute()}
          formButton>
            Dismiss
        </PrimaryButton>
      </Card>
    )

  }else{

    return(
      <Card>
        <DeleteButton
          onPress={()=>{
            props.acknowledgeEndRoute();
            props.removeTrackedRoute({
              token: props.token,
              route_id: props.end_route_info.route_id
            });
          }}
          formButton>
          Yes, Remove This Drive
        </DeleteButton>
      </Card>
    )

  }

  return <Wrapper />
}


export default SubmitButton;
