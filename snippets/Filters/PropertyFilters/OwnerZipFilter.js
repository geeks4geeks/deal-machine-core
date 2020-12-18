import React, { Component } from 'react';

import InputFilter from '../InputFilter'

class OwnerZipFilter extends Component {

  render(){

    return <InputFilter
            filter_title="Owner Address Zipcode"
            filter_value={this.props.filters.filter_owner_zip}
            filter_prop={"filter_owner_zip"}
            filter_search={this.props.filter_search}
            filter_length={5}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default OwnerZipFilter;
