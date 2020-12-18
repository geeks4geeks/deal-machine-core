import React from 'react';

import {
  Wrapper,
  BackgroundImage
} from 'app/NativeComponents/common';
import { PhotoOverlay } from 'app/NativeComponents/snippets';

import PropertyHeader from '../PropertyHeader';
import PropertyAddress from '../PropertyAddress';
import PropertyTags from './PropertyTags';

import PropertyStatusButton from '../PropertyStatusButton'

import {
  AppConfig
} from 'app/NativeActions'




const PropertyImage = (props) => {


  return (

      <PhotoOverlay
        image={
          props.active_property.deal ?
            props.active_property.deal.image ?
              props.active_property.deal.image :
              props.active_property.satellite_image :
            props.active_property.satellite_image}
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: props.colors.text_color,
          alignItems:"space-between",
          justifyContent: "space-between",
          filter: "blur(8px)"
        }}
      >
          <Wrapper style={{
            backgroundColor: "rgba(31,41,51,0.5)",
            width: "100%",
            flex: 1
          }}>
          <PropertyHeader
            {...props}
          />

          <Wrapper style={{padding: 15, paddingTop: 50}}>
            <PropertyAddress
              {...props}

              color={props.colors.white_text_color}
            />
            <PropertyTags {...props} />

            <Wrapper style={{marginTop: 10}}>
             <PropertyStatusButton {...props}/>
            </Wrapper>
          </Wrapper>
        </Wrapper>

      </PhotoOverlay>
    );
}



export default PropertyImage;
