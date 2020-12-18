import React from 'react';
import {
  Wrapper,
  ExternalImage,
  Icon
} from 'app/NativeComponents/common';

const PropertyImage = (props) =>{

  if(props.property.deal){

    if(props.property.deal.image && props.property.deal.image != ""){
      return(
        <ExternalImage
          style={{
            width:30,
            height:30,
            borderRadius: 15,
            backgroundColor:props.colors.gray_color
          }}
          image={props.property.deal.image}
        />
      )
    }
  }
  //if(props.property.location){
    return(
      <Wrapper style={{
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: props.colors.gray_color
      }}>
        <Icon
          icon="home"
          size={18}
          color={props.colors.white_text_color}
          style={{
          }}
        />
      </Wrapper>

    )
  //}

  return <Wrapper />
}


export default React.memo(PropertyImage);
