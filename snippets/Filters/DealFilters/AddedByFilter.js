import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';
import {
  getTeam,
  setItemSelectorModal,
  appRedirect
} from 'app/NativeActions';


class AddedByFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      formatted_items: [],
      selected_items: [],
      added_by_ids: null,
      filter_title: "Added By",
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

    for(let i = 0; i<this.props.my_team.length; i++){
      formatted_array.push({
        value: this.props.my_team[i].id,
        label: this.props.my_team[i].firstname+" "+this.props.my_team[i].lastname
      });
    }

    this.setState({
      formatted_items: formatted_array
    })
  }

  componentDidMount() {
    this.checkFilterSearch();

    this.formatArray();
    if(this.props.my_team.length === 0){
      this.getItems();
    }
    this.updateSelectedItems(this.props.filters.added_by_ids);
  }

  componentDidUpdate(prevProps){

    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }

    if(prevProps.my_team !== this.props.my_team){
      this.formatArray()
    }

    if(prevProps.filters.added_by_ids !== this.props.filters.added_by_ids){
      this.updateSelectedItems(this.props.filters.added_by_ids);
    }
  }

  getItems(){
    if(!this.props.team_loading){
      this.props.getTeam({ token: this.props.token, type: "load" });
    }
  }

  getLabelFromItem(id){
    for(let i = 0; i<this.props.my_team.length; i++){
      if(this.props.my_team[i].id === id){
        return this.props.my_team[i].firstname+" "+this.props.my_team[i].lastname;
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

      if(this.props.my_team.length > 0){
        return (
          <MenuItem
            onPress={()=>{
              this.props.setItemSelectorModal({
                title: "Select Options",
                description: "Select a team member or multiple team members to filter your leads.",
                items: this.state.formatted_items,
                selected_items: this.state.selected_items,
                item_limit: 0,
                modalAction:({selected_items})=>{
                  this.props.editLeadFilter({
                    prop: "added_by_ids",
                    value: selected_items.map((item)=>{
                      return item.value
                    }).join(",")
                  })
                  this.props.appRedirect({redirect: "goBack", payload: {remove: "select-team-members"}})
                },
                slug: "select-team-members"
              })
              this.props.appRedirect({redirect: "goForward", payload: {add: "select-team-members"}})
            }}
            title="Added By"
            text={this.renderSelectedItemText()}
            hasBorder={true}
          />
        )
      }

      if(this.props.team_loading){
        return (
          <Wrapper style={{
            padding: 20
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Team...</Copy>
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

const mapStateToProps = ({ auth, native, team }) => {
  const { token, user } = auth;
  const { my_team, team_loading } = team;

  return {
    token,
    user,
    my_team,
    team_loading
  };
}


export default connect(mapStateToProps, {
  getTeam,
  setItemSelectorModal,
  appRedirect
})(AddedByFilter);
