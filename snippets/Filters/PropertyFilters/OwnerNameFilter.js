import React, { Component } from 'react';

import InputFilter from '../InputFilter'

class OwnerNameFilter extends Component {

  render(){

    return <InputFilter
            filter_title="Owner Name"
            filter_value={this.props.filters.filter_owner_name}
            filter_prop={"filter_owner_name"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default OwnerNameFilter;
