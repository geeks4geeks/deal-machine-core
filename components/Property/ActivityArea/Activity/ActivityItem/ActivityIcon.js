import React, { Component } from 'react';
import { Wrapper, ProfilePic, Icon, ExternalImage } from 'app/NativeComponents/common';

class ActivityIcon extends Component{



  render(){
    if((this.props.image && this.props.image != "") || (this.props.image_email && this.props.image_email != "")){
      return (
        <Wrapper style={{
          width: 50,
          justifyContent:"center",
          alignItems: "flex-start",
          paddingTop: 3
        }}>
          <ProfilePic
            size={40}
            image={this.props.image}
            email={this.props.image_email}
          />
        </Wrapper>
      )
    }else if((this.props.deal_image && this.props.deal_image != "")){
      return (
        <Wrapper style={{
          width: 50,
          justifyContent:"center",
          alignItems: "flex-start",
          paddingTop: 3
        }}>
          <ExternalImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 20
            }}
            image={this.props.deal_image}

          />
        </Wrapper>
      )
    }else if(this.props.icon && this.props.icon != ""){
      return (
        <Wrapper style={{
          width: 50,
          justifyContent:"center",
          alignItems: "flex-start",
          paddingTop: 3
        }}>
          <Wrapper style={{
            width: 40,
            height: 40,
            justifyContent:"center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: this.props.colors.gray_color
          }}>
            <Icon
               size={20}
               icon={this.props.icon}
            />
          </Wrapper>
        </Wrapper>
      )
    }else if(this.props.fa_icon && this.props.fa_icon != ""){
      return (
        <Wrapper style={{
          width: 50,
          justifyContent:"center",
          alignItems: "flex-start",
          paddingTop: 3
        }}>
          <Wrapper style={{
            width: 40,
            height: 40,
            justifyContent:"center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: this.props.colors.gray_color
          }}>
            <Icon
               size={20}
               fa_icon={this.props.fa_icon}
            />
          </Wrapper>
        </Wrapper>
      )

    }

    return (
      <Wrapper style={{
        width: 50,
        justifyContent:"center",
        alignItems: "flex-start",
        paddingTop: 3
      }} />
    )
  }
}

export default ActivityIcon
