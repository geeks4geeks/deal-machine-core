import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  Select
} from 'app/NativeComponents/snippets';

class SaleDate extends Component{

  constructor(props){
    super(props);


    var sale_date_array = [];

    sale_date_array.push({
      key: 0,
      value: "none",
      label: "N/A"
    });
    /*
    sale_date_array.push({
      key: 1,
      value: "last_six_months",
      label: "Sold within the last 6 months"
    });
    */

    sale_date_array.push({
      key: 1,
      value: "over_2_years",
      label: "Sold over 2 years ago"
    });

    sale_date_array.push({
      key: 2,
      value: "over_5_years",
      label: "Sold over 5 years ago"
    });

    sale_date_array.push({
      key: 2,
      value: "over_10_years",
      label: "Sold over 10 years ago"
    });



    this.state = {sale_date_array: sale_date_array}
  }


  renderTitle(sale_date){
    var sale_date_title = "";
    for(var i = 0; i<this.state.sale_date_array.length; i++){
      if(sale_date == this.state.sale_date_array[i].value){
        sale_date_title = this.state.sale_date_array[i].label;
      }
    }
    return sale_date_title;
  }


  render(){
    return (
      <Select
        item_ref={"select_sale_date"}
        items={this.state.sale_date_array}
        title="Date Sold:"
        label="Select an option"
        value={this.props.property_map_options.highlight_option_sale_date}
        text={this.props.property_map_options.highlight_option_sale_date_title}
        onSelect={item => {
          this.props.editPropertyMapOptions({prop: "highlight_option_sale_date", value: item});
          this.props.editPropertyMapOptions({prop: "highlight_option_sale_date_title", value: this.renderTitle(item)});
        }}
      />
    );
  }


}

export default SaleDate;
