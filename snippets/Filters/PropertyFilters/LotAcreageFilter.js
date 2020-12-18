import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class LotAcreageFilter extends Component {

  constructor(props){

    super(props);

    let lot_acreage_array = [{
      value: -1,
      label: "Any"
    }];

    for(let i = 0; i<10; i++){
      lot_acreage_array.push({
        value: i*0.5,
        label: (i*0.5)+" acres"
      })
    }

    for(let i = 5; i<=25; i++){
      lot_acreage_array.push({
        value: i.toString(),
        label: i+" acres"
      })
    }

    this.state = {
      options: lot_acreage_array
    }
  }

  render(){

    return <NumberFilter
              filter_title="Lot Size"
              filter_type="acres"
              filter_options={this.state.options}
              filter_min={this.props.filters.min_lot_acreage}
              filter_min_prop={"min_lot_acreage"}
              filter_max={this.props.filters.max_lot_acreage}
              filter_max_prop={"max_lot_acreage"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"lot_acreage_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default LotAcreageFilter;
