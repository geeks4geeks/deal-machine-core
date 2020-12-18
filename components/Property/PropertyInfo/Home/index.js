import React, { Component } from 'react';
import {
  Wrapper
} from 'app/NativeComponents/common';
import {
  MenuButton
} from 'app/NativeComponents/snippets';

import Information from './Information';

class Home extends Component{

  render(){

    if(this.props.active_property.year_build ||
      this.props.active_property.total_bedrooms ||
      this.props.active_property.total_bathrooms ||
      this.props.active_property.building_square_feet ||
      this.props.active_property.lot_acreage){
      return (
        <Wrapper style={{
        }}>
          {/*
          <MenuButton
            onPress={()=>this.props.updateHouseTab("home")}
            title={"Property Information"}
            icon={this.props.tab === "home" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          />*/}
          <Information {...this.props}/>
        </Wrapper>
      )

    }

    return <Wrapper />
  }
}

export default Home;
