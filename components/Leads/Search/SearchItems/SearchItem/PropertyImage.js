import React, { Component } from 'react';
import {
  Wrapper,
  ExternalImage,
  Icon
} from 'app/NativeComponents/common';

class PropertyImage extends Component{

  constructor(props) {
    super(props);
  }

  render(){
    if(this.props.property.deal){

      if(this.props.property.deal.image && this.props.property.deal.image != ""){
        return(
          <ExternalImage
            style={{
              width:30,
              height:30,
              borderRadius: 15,
              backgroundColor:this.props.gray_color
            }}
            image={this.props.property.deal.image}
          />
        )
      }
    }
    //if(this.props.property.location){
      return(



        <Wrapper style={{
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: this.props.colors.gray_color
        }}>
          <Icon
            icon="home"
            size={18}
            color={this.props.colors.white_text_color}
            style={{
            }}
          />
        </Wrapper>

      )
    //}

    return <Wrapper />

  }
}


export default PropertyImage;
