import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, Title, Button, Copy, Bold } from "app/NativeComponents/common";

import SearchBar from './SearchBar';
import DealFilters from './DealFilters';
import PropertyFilters from './PropertyFilters';

import {
  editLeadFilter,
  setFilters,
  clearEditedFilters,
  editDateAddedFilter,

  getCustomFilterText
} from 'app/NativeActions';

class Filters extends Component {

  constructor(props){
    super(props);

    this.state = {
      filter_search: "",

    }

    this.updateFilterSearch = this.updateFilterSearch.bind(this);

  }

  updateFilterSearch(value){
    this.setState({
      filter_search: value
    })
  }

  componentDidMount() {

    //set filters
    this.props.setFilters(this.props.set_filters)
  }

  componentDidUpdate(prevProps) {
  }

  renderText(){
    if(getCustomFilterText(this.props.filters) != ""){
      return(
        <Wrapper style={{padding: 15}}>
          <Copy>{getCustomFilterText(this.props.filters)}</Copy>
          <Button onPress={()=>{
            this.props.clearEditedFilters()
          }}><Copy><Bold>Clear All</Bold></Copy></Button>
        </Wrapper>
      )
    }
  }

  render() {
    if(this.props.filters){
      return (
        <Wrapper>
          <SearchBar
            {...this.props}
            updateFilterSearch={this.updateFilterSearch.bind(this)}
            filter_search={this.state.filter_search}
          />
          {this.renderText()}

          <DealFilters
            include={this.props.include_deal_fitlers}
            filters={this.props.filters}
            colors={this.props.colors}
            filter_search={this.state.filter_search}
            editLeadFilter={this.props.editLeadFilter}
            editDateAddedFilter={this.props.editDateAddedFilter}
          />
          <PropertyFilters
            include={this.props.include_property_fitlers}
            include_property_input_filters={this.props.include_property_input_filters}
            filters={this.props.filters}
            colors={this.props.colors}
            filter_search={this.state.filter_search}
            editLeadFilter={this.props.editLeadFilter}
          />
        </Wrapper>
      )
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings, native, filter }) => {
  const { token, user } = auth;
  const {
    device, platform, isMobile
  } = native;
  const {
    colors
  } = settings;
  const {
    filters
  } = filter;
  return {
    token, user,
    device, platform, isMobile,
    colors,
    filters
  };
};

export default connect(
  mapStateToProps,
  {
    editLeadFilter,
    setFilters,
    clearEditedFilters,
    editDateAddedFilter
  }
)(Filters);
