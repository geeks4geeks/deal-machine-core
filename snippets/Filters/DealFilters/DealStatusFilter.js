import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';
import {
  getAllStatuses,
  setItemSelectorModal,
  appRedirect
} from 'app/NativeActions';


class DealStatusFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      formatted_items: [],
      selected_items: [],
      deal_status_ids: null,
      filter_title: "Lead Status",
      show_filter: true
    }
  }

  checkFilterSearch(){
    if(this.props.filter_search && this.props.filter_search.length > 0){
      if(this.state.filter_title.toLowerCase().startsWith(this.props.filter_search.toLowerCase().trim())){
        this.setState({show_filter: true})
      }else{
        this.setState({show_filter: false})
      }
    }else{
      this.setState({show_filter: true})
    }
  }

  formatArray(){
    let formatted_array = [];

    for(let i = 0; i<this.props.all_statuses.length; i++){
      formatted_array.push({
        value: this.props.all_statuses[i].id,
        label: this.props.all_statuses[i].title
      });
    }

    this.setState({
      formatted_items: formatted_array
    })
  }

  componentDidMount() {
    this.checkFilterSearch();
    this.formatArray();
    this.getItems();
    this.updateSelectedItems(this.props.filters.deal_status_ids);
  }

  componentDidUpdate(prevProps){
    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }

    if(prevProps.all_statuses !== this.props.all_statuses){
      this.formatArray()
    }

    if(prevProps.filters.deal_status_ids !== this.props.filters.deal_status_ids){
      this.updateSelectedItems(this.props.filters.deal_status_ids);
    }
  }

  getItems(){
    if(!this.props.all_statuses_loading){
      this.props.getAllStatuses({
        token: this.props.token
      })
    }
  }

  getLabelFromItem(id){
    for(let i = 0; i<this.props.all_statuses.length; i++){
      if(this.props.all_statuses[i].id === id){
        return this.props.all_statuses[i].title;
      }
    }
  }

  updateSelectedItems(filter_item_ids){
    let selected_items = [];
    if(filter_item_ids){
      let selected_ids = filter_item_ids.split(",");
      for(let i = 0; i<selected_ids.length; i++){
        selected_items.push({
          value: selected_ids[i],
          label: this.getLabelFromItem(selected_ids[i])
        })
      }
    }

    this.setState({
      selected_items
    })
  }

  renderSelectedItemText(){
    if(this.state.selected_items.length === 0){
      return "Any"
    }
    let item_string = "";
    for(let i = 0; i<this.state.selected_items.length; i++){
      if(item_string.length === 0){
        item_string += this.state.selected_items[i].label;
      }else{
        item_string += ", "+this.state.selected_items[i].label;
      }
    }

    return item_string;
  }


  render() {
    if(this.state.show_filter){
      if(this.props.all_statuses.length > 0){
        return (
          <MenuItem
            onPress={()=>{
              this.props.setItemSelectorModal({
                title: "Select Options",
                description: "Select a status or multiple statuses to filter your leads.",
                items: this.state.formatted_items,
                selected_items: this.state.selected_items,
                item_limit: 0,
                modalAction:({selected_items})=>{
                  this.props.editLeadFilter({
                    prop: "deal_status_ids",
                    value: selected_items.map((item)=>{
                      return item.value
                    }).join(",")
                  })
                  this.props.appRedirect({redirect: "goBack", payload: {remove: "select-lead-status"}})
                },
                slug: "select-lead-status"
              })
              this.props.appRedirect({redirect: "goForward", payload: {add: "select-lead-status"}})
            }}
            title="Lead Status"
            text={this.renderSelectedItemText()}
            hasBorder={true}
          />
        )
      }

      if(this.props.all_statuses_loading){
        return (
          <Wrapper style={{
            padding: 20
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Statuses...</Copy>
            </Row>
          </Wrapper>
        )
      }
    }

    return (
      <Wrapper />
    );
  }

}

const mapStateToProps = ({ auth, native, filter }) => {
  const { token, user } = auth;
  const { all_statuses, all_statuses_loading } = filter;

  return {
    token,
    user,
    all_statuses,
    all_statuses_loading
  };
}


export default connect(mapStateToProps, {
  getAllStatuses,
  setItemSelectorModal,
  appRedirect
})(DealStatusFilter);
