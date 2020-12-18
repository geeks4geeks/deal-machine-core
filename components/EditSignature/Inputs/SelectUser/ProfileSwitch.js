import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';



class CustomText extends Component{



  render(){

    var profile_image = "";
    for(var i = 0; i<this.props.stats.team.length; i++){
      if(this.props.stats.team[i].id == this.props.editSignature.signature_user_id){
        profile_image = this.props.stats.team[i].image;
      }
    }

    if(this.props.editSignature.signature_user_id != 0 && profile_image && profile_image != "" && !this.props.onboarding){
      return (
        <ToggleSwitch
          value={this.props.editSignature.include_image == 1 ? true : false}
          onChange={value =>{
            this.props.signatureFieldChanged({ prop: "include_image", value: value == true ? 1 : 0 });
            this.props.signatureFieldChanged({ prop: "signature_image", value: value == true ? profile_image : "" });
          }}
          title={"Use profile photo in signature?"}
          text={this.props.editSignature.include_image ? "Yes" : "No"}
        />
      );
    }

    return <Wrapper />

  }
}

export default CustomText;
