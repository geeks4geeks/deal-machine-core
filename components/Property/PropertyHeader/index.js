import React from 'react';

import {
  Header
} from 'app/NativeComponents/snippets';
const PropertyHeader = (props) => {

  return <Header
            title={""}
            leftButtonIcon={
              props.is_expanded || props.device === "mobile" ? "arrow-back" : "close"}
            leftButtonColor={props.color ? props.color : props.colors.white_text_color}
            leftButtonAction={()=>{
              if(!props.isMobile){
                props.selectActiveProperty(null);
              }
              props.hidePropertyList(false)
              props.appRedirect({redirect: "goBack", payload: {remove: "property", property_id: props.active_property.property_id, page_id: props.list_properties_page}})
            }}

            rightButtonFAIcon={!props.is_expanded && props.active_property.deal ? "expand" : ""}
            rightButtonColor={props.color ? props.color : props.colors.white_text_color}
            rightButtonAction={()=>{
              props.appRedirect({redirect: "property", payload: {property_id: props.active_property.property_id}})
            }}

            rightButtonIcon2 ={
              props.active_property.deal ?
              parseInt(props.active_property.deal.archived) !== 1 &&
              parseInt(props.active_property.deal.closed) !== 1 ? "add-a-photo" : "" : ""}
            rightButtonColor2 ={props.color ? props.color : props.colors.white_text_color}
            rightButtonAction2 ={()=>props.toggleActionSheet("edit_house_pic")}
            rightButtonDropzone2={props.device === "desktop" ? true : false}
            rightButtonDropzoneAccept2={"image/jpeg, image/png"}
            rightButtonIcon3={props.active_property.deal ? "more-vert" : ""}
            rightButtonColor3={props.color ? props.color : props.colors.white_text_color}
            rightButtonAction3={
              ()=>props.toggleActionSheet("house_more")
            }
            backgroundColor={"transparent"}
            statusBarStyle={"light-content"}

          />

}



export default PropertyHeader;
