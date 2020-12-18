import React from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';

import ButtonLayout from './ButtonLayout';
import moment from 'moment';

const DrivingButton = (props) => {

  if(props.device === "mobile" || props.isMobile){
    if(props.track_route){

      return(
        <ButtonLayout
          style={{
            marginRight: 0
          }}
          onPress={()=>{
            if(props.current_route){
              props.setModal({
                title: "Are you finished with your drive?",
                description: 'Are you sure you want to stop driving and complete your route?',
                submit: 'Stop Driving',
                onPress: ()=>{
                  props.stopTrackedRoute({
                    token: props.token,
                    route_id: props.current_route.route_id,
                    coordinates: props.current_route_section ? props.current_route_section.coordinates : [],
                    current_route: props.current_route
                  });
                },
                cancel: 'Not yet',
                onCancel: ()=>{
                }
              });
              props.toggleModal({show: true, type: "normal"});
            }
          }}
          icon="stop"
          text="Stop Driving"
        />
      )

    }


    return(
      <ButtonLayout
        style={{
          marginRight: 0
        }}
        onPress={()=>{

            if(!props.track_route){
              props.startTrackedRoute({
                token: props.token
              });
            }

            if(props.map_routes == 0 &&
              (props.user.has_routes == 0 || props.user.has_routes == null)
            ){

              //show starting modal
              props.setModal({
                title: "Driving Routes Overview",
                description: 'You Starting Driving! Next, add some properties. Complete your session by pressing “Stop Driving.” View driving routes, mileage, and time by pressing Menu and clicking Driving Routes. \n\n Optional Add-on Feature: View routes in real-time by pressing MAP Button and enabling "Show Driving Routes".',
                icon: "drive-eta",
                submit: 'Got it!',
                onPress: ()=>{
                },
                cancel: '',
                onCancel: ()=>{
                }
              });
              props.toggleModal({show: true, type: "normal"});
            }
        }}
        icon="drive-eta"
        text="Start Driving"

      />
    )
  }

  return <Wrapper />

}


export default React.memo(DrivingButton);
