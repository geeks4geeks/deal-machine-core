import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'
import SelectFilter from "../SelectFilter";

class UnitsCountFilter extends Component {

    constructor(props){

        super(props);

        let units_count_array = [{
            value: -1,
            label: "Any"
        }];

        for(let i = 0; i<10; i++){
          units_count_array.push({
              value: i,
              label: (i)+" units"
          })
        }

        for(let i = 1; i<=10; i++){
            units_count_array.push({
                value: i*10,
                label: (i*10)+" units"
            })
        }

        this.state = {
            options: units_count_array
        }
    }

    render(){

        return <NumberFilter
            filter_title="Units Count"
            filter_type="units"
            filter_options={this.state.options}
            filter_min={this.props.filters.min_units_count}
            filter_min_prop={"min_units_count"}
            filter_max={this.props.filters.max_units_count}
            filter_max_prop={"max_units_count"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
            toggle_highlight_filters={this.props.toggle_highlight_filters}
            colors={this.props.colors}
            empty_prop={"units_count_empty"}
            include_empty={false}
            show_empty={true}
        />
    }

}


export default UnitsCountFilter;
