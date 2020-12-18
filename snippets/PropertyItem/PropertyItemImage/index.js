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

const PropertyItemImage = (props) => {

  if(props.property){


      if(props.active_property && !props.bypass_start_mailers_button){

        if(props.property.deal){
          if(props.property.deal.image && props.property.deal.image !== ""){
            return(
              <Wrapper style={{
                alignItems: "center",
                justifyContent: "center",
                width:100,
                height:props.device == "desktop" ? "auto" : "100%",

                alignSelf: "stretch"

              }}>

                <ExternalImage
                  style={{
                    width:100,
                    height:"100%",
                    alignSelf: "stretch",
                    backgroundColor:props.colors.gray_color
                  }}
                  image={props.property.deal.image}
                />

              </Wrapper>
            )
          }
        }

        if(props.isMobile && parseInt(props.active_property.property_id) === parseInt(props.property.property_id) && props.property.deal){
          return(
            <Button
              onPress={()=>{
                props.toggleActionSheet("house_pic");
              }}
              style={{
                width:100,
                height:props.device == "desktop" ? "auto" : "100%",
                backgroundColor:props.colors.gray_color,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch"
              }}>
                <Icon
                  size={26}
                  icon="add-a-photo"
                />
            </Button>
          )
        }

        if(parseInt(props.active_property.property_id) === parseInt(props.property.property_id)){

          return(
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
              width:100,
              height:props.device == "desktop" ? "auto" : "100%",
              alignSelf: "stretch"

            }}>

              <ExternalImage
                style={{
                  width:100,
                  height:"100%",
                  alignSelf: "stretch",
                  backgroundColor:props.colors.gray_color
                }}
                image={props.property.satellite_image}
              />

            </Wrapper>
          )
        }
      }


      if(!props.isMobile || !props.toggle_lead_images){
        let image_initials = "";
        if(props.property.owner_name !== "" && props.property.owner_name && props.user.team_clearance_level > 0){
          if(props.property.owner_firstname && props.property.owner_lastname){
            if(props.property.owner_firstname.length > 0 && props.property.owner_lastname.length > 0){
              image_initials = props.property.owner_firstname[0]+props.property.owner_lastname[0];
            }else if(props.property.owner_name.length > 1){
              image_initials = props.property.owner_name[0]+props.property.owner_name[1];
            }
          }else if(props.property.owner_name.length > 1){
            image_initials = props.property.owner_name[0]+props.property.owner_name[1];
          }
        }

        if(props.property.deal){
          if(props.property.deal.image && props.property.deal.image !== ""){
            return(
              <Wrapper style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 12,
                marginRight: 0

              }}>

                <ExternalImage
                  style={{
                    width:40,
                    height:40,
                    borderRadius: 20,
                    backgroundColor:props.colors.gray_color
                  }}
                  image={props.property.deal.image}
                />

              </Wrapper>
            )
          }
        }


        if(image_initials !== ""){
          return(
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 12,
              marginRight: 0
            }}>
              <Wrapper style={{
                width:40,
                height:40,
                borderRadius: 20,
                backgroundColor:props.colors.gray_color,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Title style={{width:50, textAlign: "center"}}>{image_initials}</Title>
              </Wrapper>
            </Wrapper>
          )
        }




        return (
          <Wrapper
            style={{
              width:40,
              height:40,
              borderRadius: 20,
              backgroundColor:props.colors.gray_color,
              margin: 12,
              marginRight: 0,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon
                size={18}
                icon="home"
              />
          </Wrapper>
        )

      }

    }

    return <Wrapper style={{width: 15}}/>;

}

export default PropertyItemImage;
