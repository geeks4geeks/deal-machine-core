import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectFilter from '../SelectFilter'

class PropertyStateFilter extends Component {

  constructor(props){
    super(props);

    let state_data = [];
    for(var i = 0; i<props.states.length; i++){
      state_data.push({
        label: props.states[i].name,
        value: props.states[i].abbr
      });
    }

    this.state = {
      options: state_data
    }
  }

  render(){

    return <SelectFilter
            filter_title="Property Address State"
            filter_options={this.state.options}
            filter_value={this.props.filters.filter_property_state}
            filter_prop={"filter_property_state"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
  }

}


const mapStateToProps = ({ settings }) => {
  const { states } = settings;
  return { states }
}

export default connect(mapStateToProps, {})(PropertyStateFilter);
