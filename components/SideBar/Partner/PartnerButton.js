import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';

import SideBarButton from '../SideBarButton';

import {
  openUrl
} from 'app/NativeActions';

class PartnerButton extends Component{


  render(){
    if(this.props.stats){
      if(this.props.stats.partner.id && this.props.user.team_owner == 1){

        if(this.props.stats.partner.id != 0 && this.props.stats.partner.popup_button_link && this.props.stats.partner.popup_button_link != ""){
          return (
            <Wrapper>
              <SideBarButton
                active={false}
                title={this.props.stats.partner.button_title}
                icon={this.props.stats.partner.button_icon}
                onPress={()=>{

                  this.props.setModal({
                    title: this.props.stats.partner.popup_title,
                    description: this.props.stats.partner.popup_description,
                    icon: "",
                    image: this.props.dark_mode == "dark_mode" ? this.props.stats.partner.white_image ? this.props.stats.partner.white_image : this.props.stats.partner.white_image : this.props.stats.partner.white_image,
                    submit: this.props.stats.partner.popup_button_title,
                    onPress: ()=>{
                      openUrl(this.props.stats.partner.popup_button_link)
                    },
                    cancel: this.props.stats.partner.popup_cancel_button,
                    onCancel: ()=>{
                    }
                  });
                  this.props.toggleModal({show: true, type: "normal"});

                }}
                hideButton={false}
                mobile_toggle_drawer={this.props.mobile_toggle_drawer}
                colors={this.props.colors}
              />
            </Wrapper>
          );
        }
      }
    }

    return <Wrapper />;

  }

}

export default PartnerButton;
