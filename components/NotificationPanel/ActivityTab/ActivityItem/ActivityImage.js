import React, { Component } from 'react';
import {
  Wrapper,
  ExternalImage,
  Card
} from 'app/NativeComponents/common';


class ActivityImage extends Component{

  render(){



    switch(this.props.item.activity_type){

      case "routes":

        if(this.props.item.lead_image && this.props.item.lead_image !== ""){
          return(
            <Card>
              <ExternalImage
                style={{
                  width:"100%",
                  height:120,
                  borderRadius: 5,
                  alignSelf: "stretch",
                  backgroundColor:this.props.colors.gray_color
                }}
                image={this.props.item.lead_image}
              />
            </Card>
          )
        }

      break;

      default:


          if(this.props.item.lead_image && this.props.item.lead_image !== ""){
            return(
              <Card>
                <ExternalImage
                  style={{
                    width:"100%",
                    height:120,
                    alignSelf: "stretch",
                    borderRadius: 5,
                    backgroundColor:this.props.colors.gray_color
                  }}
                  image={this.props.item.lead_image}
                />
              </Card>
            )
          }
          /*
          return(

            <Card>

              <ExternalImage
                style={{
                  width:"100%",
                  height:120,
                  alignSelf: "stretch",
                  backgroundColor:this.props.colors.gray_color
                }}
                image={satellite_image}
              />

            </Card>
          )
          */
      break;
    }

    return <Wrapper />
  }

}

export default ActivityImage;
