import React from 'react';
import {
  ExternalImage,
  Icon,
  Button,
  Title,
  Wrapper
} from 'app/NativeComponents/common';


import {
  AppConfig
} from 'app/NativeActions';

const MobilePropertyImage = (props) => {

    if(props.property &&
      (props.isMobile && props.toggle_lead_images) &&
      (!props.active_property || props.bypass_start_mailers_button)){

      if(props.property.deal){
        if(props.property.deal.image && props.property.deal.image !== ""){
          return(
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
              width:"100%",
              height:200,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,

              alignSelf: "stretch"
            }}>
              <ExternalImage
                style={{
                  width:"100%",
                  height:200,
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                  alignSelf: "stretch",
                  backgroundColor:props.colors.gray_color
                }}
                image={props.property.deal.image}
              />
            </Wrapper>
          )
        }
      }
      /*
      return(
        <Wrapper style={{
          alignItems: "center",
          justifyContent: "center",
          width:"100%",
          height:200,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,

          alignSelf: "stretch"
        }}>
          <ExternalImage
            style={{
              width:"100%",
              height:200,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              alignSelf: "stretch",
              backgroundColor:props.colors.gray_color
            }}
            image={satellite_image}
          />
        </Wrapper>
      )
      */
    }

    return <Wrapper />;

}

export default MobilePropertyImage;
