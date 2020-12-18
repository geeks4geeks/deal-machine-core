import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';

import Information from './Information';

class Sale extends Component{

  render(){
    if(this.props.active_property.saleprice ||
      this.props.active_property.saledate){
      return (
        <Wrapper>
          {/*
          <MenuButton
            onPress={()=>this.props.updateHouseTab("sale")}
            title={"Sale Information"}
            icon={this.props.tab === "sale" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          />
          */}
          <Information {...this.props}/>
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default Sale;
