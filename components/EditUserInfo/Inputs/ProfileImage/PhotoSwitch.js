import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';
class PhotoSwitch extends Component{


  render(){
    if(this.props.user.team_clearance_level > 0){
      return (
        <ToggleSwitch
          value={this.props.editUser.use_image == 1 ? true : false}
          onChange={value =>
            this.props.updateUserFieldChange({ prop: "use_image", value: value == true ? 1 : 0 })
          }
          title={"Use photo in mail?"}
          text={this.props.editUser.use_image ? "Yes" : "No"}
        />
      );
    }

    return <Wrapper />
  }

}

export default PhotoSwitch;
