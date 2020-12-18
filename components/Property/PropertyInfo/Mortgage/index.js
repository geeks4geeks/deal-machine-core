import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  MenuButton
} from 'app/NativeComponents/snippets';

import Information from './Information';

class Mortgage extends Component{

  render(){

    if(this.props.active_property.calculated_equity_percent ||
      this.props.active_property.mortgage_amount
    ){
      return (
        <Wrapper style={{
        }}>
          {/*
          <MenuButton
            onPress={()=>this.props.updateHouseTab("mortgage")}
            title={"Mortgage Information"}
            icon={this.props.tab === "mortgage" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          />
          */}
          <Information {...this.props}/>
        </Wrapper>
      );

    }

    return <Wrapper />;
  }
}

export default Mortgage;
