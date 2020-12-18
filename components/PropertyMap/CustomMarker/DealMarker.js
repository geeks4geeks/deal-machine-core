import React from 'react';
import { Wrapper, Copy, Bold, Icon } from 'app/NativeComponents/common';


import {store} from 'app/store';

const renderPropertyMarker = (showPropertyMarker, is_active_property, colors, device) => {

  if(showPropertyMarker){
    return(
      <Wrapper style={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Wrapper style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 2},
          backgroundColor: is_active_property ? colors.active_color : colors.success_color
        }}>
          <Wrapper style={
            {
              width: 20,
              height: 20,
              borderRadius: 10,
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: is_active_property ? colors.card_color : colors.card_color,
            }}>
            <Icon
              style={{
                marginTop: device == "desktop" ? 1 : 0,
                marginLeft: device == "desktop" ? 1 : 0
              }}
              color={is_active_property ? colors.active_color : colors.success_color}
              icon="home"
              size={14}
            />
          </Wrapper>


        </Wrapper>
        {/* A little marker thing might need to remove for android */}
        <Wrapper style={{
          width: 0,
          height: 0,
          marginTop: -2,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderTopWidth: 5,
          borderRightWidth: 6,
          borderBottomWidth: 0,
          borderLeftWidth: 6,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderTopColor: is_active_property ? colors.active_color : colors.success_color

        }} />
      </Wrapper>
    )
  }
}

const DealMarker = (props) =>{

  const colors = store.getState().settings.colors;
  const dark_mode = store.getState().settings.dark_mode;

  return(
    <Wrapper style={{
      alignItems: "center",
      justifyContent: "center",
    }}>

      {renderPropertyMarker(props.showPropertyMarker, props.is_active_property, colors, props.device )}
      <Wrapper style={{
        backgroundColor: dark_mode == "dark_mode" ? "rgba(31,41,51, 0.5)" : "rgba(255, 255, 255, 0.5)",
        marginTop: 3
      }}>
        <Copy style={{
          fontSize: 12
        }}><Bold>{props.label}</Bold></Copy>
      </Wrapper>
    </Wrapper>
  )
}


export default React.memo(DealMarker);
