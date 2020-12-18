import React from 'react';

import { Wrapper, Copy, Bold } from 'app/NativeComponents/common';

import {store} from 'app/store';

const renderPropertyMarker = (showPropertyMarker, is_active_property, colors) => {

  if(showPropertyMarker){
    return(
      <Wrapper style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        backgroundColor: colors.card_color
      }}>
        <Wrapper style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: is_active_property ? colors.active_color : colors.dot_color
        }} />
      </Wrapper>
    )
  }

}

const DefaultPropertyMarker = (props) => {

  const dark_mode = store.getState().settings.dark_mode;
  const colors = store.getState().settings.colors;

  return(
    <Wrapper style={{
      lignItems: "center",
      justifyContent: "center"
    }}>
      {renderPropertyMarker(props.showPropertyMarker, props.is_active_property, colors)}

      <Wrapper style={{
        marginTop: 3,
        backgroundColor: dark_mode == "dark_mode" ? "rgba(31,41,51, 0.5)" : "rgba(255, 255, 255, 0.5)",
      }}>
        <Copy style={{fontSize: 12}}><Bold>{props.label}</Bold></Copy>
      </Wrapper>
    </Wrapper>
  )

}


export default React.memo(DefaultPropertyMarker);
