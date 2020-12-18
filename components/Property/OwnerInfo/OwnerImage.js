
import React from 'react';

import {
  Wrapper,
  ExternalImage,
  Copy,
  Icon
} from 'app/NativeComponents/common';


const OwnerImage = (props) => {

  if(props.owner_image && props.owner_image !== ""){
    return (
      <Wrapper>
        <ExternalImage
          style={{
            width: 36,
            height: 36,
            marginRight: 10,
            borderRadius: 18
          }}

        />
      </Wrapper>
    )
  }



  let image_initials = "";
  if(props.owner_name){
    if(props.owner_firstname && props.owner_lastname){
      if(props.owner_firstname.length > 0 && props.owner_lastname.length > 0){
        image_initials = props.owner_firstname[0]+props.owner_lastname[0];
      }else if(props.owner_name.length > 1){
        image_initials = props.owner_name[0]+props.owner_name[1];
      }
    }else if(props.owner_name.length > 1){
      image_initials = props.owner_name[0]+props.owner_name[1];
    }
    image_initials = image_initials.toUpperCase();
  }


  if(image_initials.length > 0){
    return (
      <Wrapper style={{
        width: 36,
        height: 36,
        marginRight: 10,
        borderRadius: 18,
        backgroundColor: props.colors.border_color,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <Copy style={{width:36, textAlign: "center"}}>{image_initials}</Copy>
      </Wrapper>
    )
  }
  if(props.owner_status_info){
    if(props.owner_status_info.slug === "corporate_owner"){
      return (
        <Wrapper style={{
          width: 36,
          height: 36,
          marginRight: 10,

          borderRadius: 18,
          backgroundColor: props.colors.border_color,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            icon="business"
            size={18}
          />
        </Wrapper>
      )
    }
  }

  /*
  if(!props.owner_name || props.owner_name === ""){
    return (
      <Wrapper style={{
        width: 36,
        height: 36,
        marginRight: 10,

        borderRadius: 18,
        backgroundColor: props.colors.border_color,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon
          fa_icon="question"
          size={18}
        />
      </Wrapper>
    )
  }
  */

  return (
    <Wrapper style={{
      width: 36,
      height: 36,
      marginRight: 10,

      borderRadius: 18,
      backgroundColor: props.colors.gray_color,
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Icon
        fa_icon="user"
        size={18}
      />
    </Wrapper>
  )


}



export default OwnerImage;
