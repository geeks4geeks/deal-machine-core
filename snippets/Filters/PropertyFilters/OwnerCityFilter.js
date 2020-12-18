import React, { Component } from 'react';

import InputFilter from '../InputFilter'

class OwnerCityFilter extends Component {

  render(){

    return <InputFilter
            filter_title="Owner Address City"
            filter_value={this.props.filters.filter_owner_city}
            filter_prop={"filter_owner_city"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default OwnerCityFilter;
