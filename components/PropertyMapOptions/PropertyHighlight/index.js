import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  ToggleSwitch
} from 'app/NativeComponents/snippets';

import OwnerStatus from './OwnerStatus';
import SaleDate from './SaleDate';
import HomeValue from './HomeValue';
import HomeEquity from './HomeEquity';

class PropertyHighlight extends Component{


  renderHighlightOptions(){
    if(this.props.property_map_options.show_property_highlight){
      return(
        <Wrapper>
          <OwnerStatus {...this.props}/>
          <SaleDate {...this.props}/>
          <HomeValue {...this.props}/>
          <HomeEquity {...this.props}/>
        </Wrapper>
      )

    }
  }


  render(){

    if(this.props.user.team_clearance_level > 0){
      return (
        <Wrapper>
          <ToggleSwitch
            onChange={value => {
              this.props.editPropertyMapOptions({prop: "show_property_highlight", value});
            }}
            value={this.props.property_map_options.show_property_highlight}
            title={'Highlight Properties'}
            text={"Select options to show highlight of properties matching your criteria."}
          />
          {this.renderHighlightOptions()}
        </Wrapper>
      );
    }

    return <Wrapper />
  }


}

export default PropertyHighlight;
