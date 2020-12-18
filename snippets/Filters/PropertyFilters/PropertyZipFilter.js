import React, { Component } from 'react';

import InputFilter from '../InputFilter'

class PropertyZipFilter extends Component {

  render(){

    return <InputFilter
            filter_title="Property Address Zipcode"
            filter_value={this.props.filters.filter_property_zip}
            filter_prop={"filter_property_zip"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default PropertyZipFilter;
