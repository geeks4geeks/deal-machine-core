import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';
import {
  setListModal,
  appRedirect
} from 'app/NativeActions';


class ListsFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      selected_items: props.filter_lists,
      filter_title: "Lists",
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

  componentDidMount() {
    this.checkFilterSearch();
  }

  componentDidUpdate(prevProps){
    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }

    if(prevProps.filter_lists !== this.props.filter_lists){
      this.setState({
        selected_items: this.props.filter_lists
      })
    }
  }

  getLabelFromItem(id){
    for(let i = 0; i<this.state.selected_items.length; i++){
      if(this.state.selected_items[i].id === id){
        return this.state.selected_items[i].title;
      }
    }
  }

  renderSelectedItemText(){
    if(!this.state.selected_items){
      return "Any"
    }
    if(this.state.selected_items.length === 0){
      return "Any"
    }
    let item_string = "";
    for(let i = 0; i<this.state.selected_items.length; i++){
      if(item_string.length === 0){
        item_string += this.state.selected_items[i].title;
      }else{
        item_string += ", "+this.state.selected_items[i].title;
      }
    }

    return item_string;
  }


  render() {
    if(this.state.show_filter){
      return (
        <MenuItem
          onPress={()=>{
            this.props.setListModal({
              title: "Filter List(s)",
              description: "Select a list or mulitple lists to filter your leads.",
              type: "filter_lists_for_leads",
              selected_leads:[],
              selected_lists: this.state.selected_items,
              modalAction: ({selected_leads, selected_lists})=>{

                this.props.editLeadFilter({
                  prop: "list_ids",
                  value: selected_lists ? selected_lists.length > 0 ? selected_lists : null : null
                })
                this.setState({
                  selected_items: selected_lists ? selected_lists : []
                })
                this.props.appRedirect({redirect: "goBack", payload: {remove: "lists"}})
              }
            });
            this.props.appRedirect({redirect: "goForward", payload: {add: "lists"}})
          }}
          title="Lists"
          text={this.renderSelectedItemText()}
          hasBorder={true}
        />
      )


    }

    return (
      <Wrapper />
    );
  }

}

const mapStateToProps = ({ auth, native, filter, lead }) => {
  const { token, user } = auth;
  const { filter_lists } = filter;
  const { list_properties_page } = lead;

  return {
    token,
    user,
    filter_lists,
    list_properties_page
  };
}


export default connect(mapStateToProps, {
  setListModal,
  appRedirect
})(ListsFilter);
