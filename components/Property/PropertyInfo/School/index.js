import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  MenuButton
} from 'app/NativeComponents/snippets';

import Information from './Information';

class School extends Component{

  render(){

    if(this.props.active_property.school_district){
      return (
        <Wrapper style={{
        }}>
          {/*
          <MenuButton
            onPress={()=>this.props.updateHouseTab("school")}
            title={"School District"}
            icon={this.props.tab === "school" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          />
          */}
          <Information {...this.props}/>
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default School;
