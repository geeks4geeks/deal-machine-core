import React from 'react';
import {
  Wrapper,
  Button,
  Icon
} from 'app/NativeComponents/common';

import {
  getMyLocation,
  dismissMobileKeyboard
} from 'app/NativeActions'

const LocationButton = (props) =>{

  return(
    <Button onPress={()=>{

      dismissMobileKeyboard();
      props.selectActiveProperty(null);
      if(!props.lock_location_tracking){
        getMyLocation({
          success: (coordinates)=>{
            props.updateMapLocation({
              coordinates: coordinates,
              active_property: null
            });
          },
          onError: ()=>{
            props.lockLocationTracking(false);
          }
        });
      }

      props.lockLocationTracking(!props.lock_location_tracking);
    }}
      style={{
        width: 50,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Icon
        icon={props.lock_location_tracking ? "navigation" : ""}
        fa_icon={!props.lock_location_tracking ? "location-arrow" : ""}
        color={props.lock_location_tracking ? props.colors.active_color : props.colors.text_color}
        size={18}
      />
    </Button>
  );

  return <Wrapper />

}


export default React.memo(LocationButton);
