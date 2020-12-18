import React, { Component } from 'react';
import {
  Wrapper,
  Button,
  Icon
} from 'app/NativeComponents/common';

import {
  dismissMobileKeyboard
} from 'app/NativeActions'

class OptionsButton extends Component{

  render(){

    if(!this.props.isMobile && this.props.user.team_clearance_level > 0){
      return(
        <Button onPress={()=>{

          dismissMobileKeyboard();
          this.props.appRedirect({redirect: "leadoptions", payload:{page_id: this.props.list_properties_page}})
        }}
          style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon
            icon={"more-vert"}
            size={18}
          />
        </Button>
      );
    }

    return <Wrapper />

  }
}


export default OptionsButton;
