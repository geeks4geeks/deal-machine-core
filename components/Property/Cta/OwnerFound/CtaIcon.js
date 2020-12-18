import React, { Component } from 'react';
import {
  Animation,
  Icon
} from 'app/NativeComponents/common';

class CtaIcon extends Component{

  render(){
    if(this.props.owner.owner_status_info.slug === "corporate_owner" && parseInt(this.props.owner.owner_status_info.is_bank) === 1){
      //Bank
      return (
        <Animation type="zoomIn">
          <Icon
            color={this.props.colors.error_color}
            icon="account-balance"
            size={44}
          />
        </Animation>
      )
    }else if(this.props.owner.owner_status_info.slug === "corporate_owner"){
      //corporate Owned
      return (
        <Animation type="zoomIn">
          <Icon
            color={this.props.colors.success_color}
            icon="business"
            size={44}
          />
        </Animation>
      )
    }
    //normal
    return (
      <Animation type="zoomIn">
        <Icon
          color={this.props.colors.success_color}
          icon="check-circle"
          size={44}
        />
      </Animation>
    )
  }

}

export default CtaIcon;
