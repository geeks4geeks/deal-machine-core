import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class VacancyFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "is_vacant",
        label: "Is Vacant"
      },
      {
        value: "is_not_vacant",
        label: "Not Vacant"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Is Property Vacant?"
              filter_options={this.state.options}
              filter_value={this.props.filters.vacancy_type}
              filter_prop={"vacancy_type"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default VacancyFilter;
