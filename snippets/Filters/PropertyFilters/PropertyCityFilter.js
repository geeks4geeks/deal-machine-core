import React, { Component } from 'react';

import InputFilter from '../InputFilter'

class PropertyCityFilter extends Component {

  render(){

    return <InputFilter
            filter_title="Property Address City"
            filter_value={this.props.filters.filter_property_city}
            filter_prop={"filter_property_city"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default PropertyCityFilter;
