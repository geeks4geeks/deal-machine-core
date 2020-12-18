import React from 'react';
import {
  Wrapper,
  Row,
  Spin,
  Copy,
  Icon,
  Bold
} from 'app/NativeComponents/common';

import ButtonLayout from 'app/DealMachineCore/components/PropertyMap/MapBottom/BottomButtons/ButtonLayout';

const BottomButtons = (props) => {

  if(!props.active_property ){

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

    return(
      <Wrapper style={{
        alignItems: "center",
        justifyContent: "center"
      }}>

        <Row style={{
          alignItems: "center",
          justifyContent: "center"
        }}>

          <ButtonLayout


            onPress={()=>{
              props.appRedirect({redirect: "map"})
            }}
            icon="map"
            text={"View Area In Property Map"}
            style={{marginRight: 0}}

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
      </Wrapper>
    )

  }



  ///we have an active property and we're searching the area
  if(props.map_properties_loading){
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
