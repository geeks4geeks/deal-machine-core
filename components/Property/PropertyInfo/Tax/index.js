import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  MenuButton
} from 'app/NativeComponents/snippets';

import Information from './Information';

class Tax extends Component{

  render(){
    if(this.props.active_property.calculated_improvement_value ||
      this.props.active_property.calculated_land_value ||
      this.props.active_property.calculated_total_value){
      return (
        <Wrapper style={{
        }}>
          {/*
          <MenuButton
            onPress={()=>this.props.updateHouseTab("tax")}
            title={"Tax Information"}
            icon={this.props.tab === "tax" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          />
          */}
          <Information {...this.props}/>
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default Tax;
