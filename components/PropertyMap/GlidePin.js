import React from 'react';
import {
  Wrapper,
  Icon
} from 'app/NativeComponents/common';

const GlidePin = (props) =>{
  if(props.map_mode == "glide"){
    return(
      <Wrapper pointerEvents="none" style={{
        position:"absolute",
        top: 0,
        bottom:0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none"
      }}

        >
        <Icon
          icon="add"
          size={20}
          style={{
            marginBottom: 0//props.device == "mobile" ? 175 : 0
          }}
        />
      </Wrapper>
    )
  }


  return <Wrapper />;
}


export default React.memo(GlidePin);
