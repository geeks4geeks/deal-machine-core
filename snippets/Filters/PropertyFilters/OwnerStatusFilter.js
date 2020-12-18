import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class OwnerStatusFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "owner_occupied",
        label: "Owner Occupied"
      },
      {
        value: "absentee_owner",
        label: "Absentee Owner"
      },
      {
        value: "corporate_owned",
        label: "Corporate Owner"
      },
      {
        value: "not_corporate_owned",
        label: "Non-Corporate Owner"
      },
      {
        value: "out_of_state_absentee_owner",
        label: "Out-Of-State Absentee Owner"
      },
      {
        value: "owns_multiple_properties",
        label: "Owns Multiple Properties"
      },
      {
        value: "owner_not_found",
        label: "Owner Not Found"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Owner Type"
              filter_options={this.state.options}
              filter_value={this.props.filters.owner_status}
              filter_prop={"owner_status"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default OwnerStatusFilter;
