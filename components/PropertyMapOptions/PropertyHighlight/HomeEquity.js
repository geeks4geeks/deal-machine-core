import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  Select
} from 'app/NativeComponents/snippets';

class HomeEquity extends Component{

  constructor(props){
    super(props);


    var home_equity_array = [];

    home_equity_array.push({
      key: 0,
      value: "none",
      label: "N/A"
    });

    home_equity_array.push({
      key: 1,
      value: "over_10_percent",
      label: "Over 10%"
    });

    home_equity_array.push({
      key: 2,
      value: "over_20_percent",
      label: "Over 20%"
    });

    home_equity_array.push({
      key: 3,
      value: "over_50_percent",
      label: "Over 50%"
    });



    this.state = {home_equity_array: home_equity_array}
  }


  renderTitle(home_equity){
    var home_equity_title = "";
    for(var i = 0; i<this.state.home_equity_array.length; i++){
      if(home_equity == this.state.home_equity_array[i].value){
        home_equity_title = this.state.home_equity_array[i].label;
      }
    }
    return home_equity_title;
  }


  render(){
    return (
      <Select
        item_ref={"select_home_equity"}
        items={this.state.home_equity_array}
        title="Equity Percent:"
        label="Select an option"
        value={this.props.property_map_options.highlight_option_home_equity}
        text={this.props.property_map_options.highlight_option_home_equity_title}
        onSelect={item => {
          this.props.editPropertyMapOptions({prop: "highlight_option_home_equity", value: item});
          this.props.editPropertyMapOptions({prop: "highlight_option_home_equity_title", value: this.renderTitle(item)});

        }}
      />
    );
  }


}

export default HomeEquity;
