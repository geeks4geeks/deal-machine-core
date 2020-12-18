import React from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy,
  Icon,
  Bold
} from 'app/NativeComponents/common';

import ButtonLayout from './ButtonLayout';
import DrivingButton from './DrivingButton';


import {
  getCustomFilterText
} from 'app/NativeActions';

const renderFilterText = (props) => {
  const custom_filter_text = getCustomFilterText(props.applied_highlights, true);
  if(custom_filter_text.length > 0){
    return(
      <Wrapper style={{
        backgroundColor: props.dark_mode == "dark_mode" ? "rgba(31,41,51, 0.7)" : "rgba(255, 255, 255, 0.7)",
        paddingLeft: 15,
        paddingRight: 15
      }}>
        <Row>
          <Copy>
            <Bold>{custom_filter_text}</Bold>
          </Copy>
        </Row>
      </Wrapper>
    )
  }
}

const BottomButtons = (props) => {

  if((!props.active_property && !props.active_address ) || (!props.isMobile && props.device !== "mobile" && props.user.team_clearance_level > 0)){

    if(props.reverse_geocode_loading){
      return(
        <ButtonLayout
          disabled
          spin
          text="Searching For Property..."

        />
      )
    }

    //map is loading
    if(props.map_properties_loading){

      return(
        <ButtonLayout
          disabled
          spin
          text="Searching Area..."

        />
      )

    }


    //user is too zoomed out
    if(props.routeZoomMax && props.showZoomMessage){

      return(
        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ButtonLayout
            onPress={()=>{
              props.zoomToMin();
            }}
            icon="zoom-in"
            text="Zoom In To View Routes & Properties"
          />
        </Row>
      )

    } if(props.showZoomMessage){

      //if(props.lock_location_tracking){
        return(
          <Row style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ButtonLayout
              onPress={()=>{
                props.zoomToMin();
              }}
              icon="zoom-in"
              text="Zoom In To View Properties"
              
            />
            <ButtonLayout
              onPress={()=>{
                props.refreshMap(true);
                props.getProperties({
                  load_type: "refresh"
                })

              }}
              style={{
                marginLeft: 0
              }}
              icon="refresh"
              icon={props.number_of_properties > 0 ? "refresh" : "search"}
              text={props.number_of_properties > 0 ? "Refresh Area" : "Search Area"}
            />
          </Row>
        )
      //}
      /*
      return(
        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ButtonLayout
            onPress={()=>{
              props.zoomToMin();
            }}
            style={{
              marginRight: 0
            }}
            icon="zoom-in"
            text="Zoom In To View Properties"
          />
          <ButtonLayout
            onPress={()=>{
              props.getProperties({
                load_type: "refresh"
              })
            }}
            icon="refresh"
            text="Search Area"
          />
        </Row>
      )
      */
    }

    /*
    if(props.is_pan_dragging &&
      !props.lock_location_tracking){
      return(
        <ButtonLayout
          disabled
          icon="home"
          text="Properties will show upon release"

        />
      )
    }
    */





    if(props.lock_location_tracking){
      return(
        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <DrivingButton
            token={props.token}
            user={props.user}
            map_routes={props.map_routes}
            startTrackedRoute={props.startTrackedRoute}
            stopTrackedRoute={props.stopTrackedRoute}
            setModal={props.setModal}
            track_route={props.track_route}
            toggleModal={props.toggleModal}
            current_route={props.current_route}
            current_route_section={props.current_route_section}
            device={props.device}
            isMobile={props.isMobile}

          />
          <ButtonLayout
            onPress={()=>{
              props.refreshMap(true);
              props.getProperties({
                load_type: "refresh"
              })

            }}
            icon="refresh"
            icon={props.number_of_properties > 0 ? "refresh" : "search"}
            text={props.number_of_properties > 0 ? "Refresh Area" : "Search Area"}
          />
        </Row>
      )
    }




    return(
      <Wrapper style={{
        alignItems: "center",
        justifyContent: "center"
      }}>

        {renderFilterText(props)}
        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <DrivingButton
            token={props.token}
            user={props.user}
            map_routes={props.map_routes}
            startTrackedRoute={props.startTrackedRoute}
            stopTrackedRoute={props.stopTrackedRoute}
            setModal={props.setModal}
            track_route={props.track_route}
            toggleModal={props.toggleModal}
            current_route={props.current_route}
            current_route_section={props.current_route_section}
            device={props.device}
            isMobile={props.isMobile}

          />
          <ButtonLayout


            onPress={()=>{
              props.refreshMap(true);
              props.getProperties({
                load_type: "refresh"
              })

            }}
            icon={props.number_of_properties > 0 ? "refresh" : "search"}
            text={props.number_of_properties > 0 ? "Refresh Area" : "Search Area"}

          />
        </Row>
      </Wrapper>
    )

  }



  ///we have an active property and we're searching the area
  if(props.map_properties_loading &&
    !props.lock_location_tracking
  ){
    return(
      <Wrapper style={{
        backgroundColor: props.dark_mode == "dark_mode" ? "rgba(31,41,51, 0.5)" : "rgba(255, 255, 255, 0.5)",
      }}>
        <Row>
          <Wrapper style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5
          }}>
            <Spin size="small"/>
          </Wrapper>
          <Copy>
            <Bold>Searching Area...</Bold>
          </Copy>
        </Row>
      </Wrapper>
    )


  }




  return <Wrapper />
}


export default React.memo(BottomButtons);
