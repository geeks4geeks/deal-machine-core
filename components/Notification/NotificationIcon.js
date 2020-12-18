import React, { Component } from 'react';
import { Wrapper, Icon, ProfilePic } from 'app/NativeComponents/common';

class NotificationIcon extends Component{

  undoAction(){

  }

  render(){
    if(this.props.notification){
      if(this.props.notification.image && this.props.notification.image != ""){
        switch(this.props.notification.type){
          default:
            return(
              <Icon
                color={this.props.colors.active_color}
                icon={this.props.notification.image}
                size={32}
                style={{marginRight: 10}}
              />
            )
          break;

          case "at_mention":
            return (
              <ProfilePic
                icon={this.props.notification.email}
                icon={this.props.notification.image}
                size={32}
              />
            )
          break;
        }
      }
    }

    return <Wrapper />
  }
}

export default NotificationIcon;
