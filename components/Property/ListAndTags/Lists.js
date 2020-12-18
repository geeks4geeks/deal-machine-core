import React, { Component } from 'react';

import {
  Wrapper
} from 'app/NativeComponents/common';

import {
  MenuItem
} from 'app/NativeComponents/snippets';

class Lists extends Component{

  constructor(props){
    super(props);
    this._lists_button = React.createRef();

    this.state = {
      lists: props.active_property.deal && props.active_property.deal.lists ? props.active_property.deal.lists : [],
      temp_lists: null
    }

  }

  componentDidUpdate(prevProps){
    if(this.props.active_property !== prevProps.active_property){
      this.setState({lists: this.props.active_property.deal && this.props.active_property.deal.lists ? this.props.active_property.deal.lists : []})
    }
  }

  updateTempLists(item = null){

    this.setState({
      temp_lists: item
    })
  }


  renderNoLists(){
    if(this.state.lists.length == 0 && this.state.temp_lists == null){
      return "N/A"
    }
  }

  render(){
    if(this.props.active_property.deal){
      if(this.props.user.team_clearance_level > 0){
        return (
          <Wrapper
          wrapper_ref={this._lists_button}
          style={{
            borderBottomColor: this.props.colors.border_color,
            borderBottomWidth: 1,
            borderBottomStyle: "solid"
          }}>
            <MenuItem
              title={"Lists(s):"}
              text= {this.state.temp_lists === null && this.state.lists.length > 0 ? this.state.lists.map((list, i)=>{
                return i == (this.state.lists.length - 1) ? list.title : list.title+", ";
              }) : this.state.temp_lists !== null ? this.state.temp_lists.map((list, i)=>{
                return i == (this.state.temp_lists.length - 1) ? list.title : list.title+", ";
              }) : this.renderNoLists()}
              onPress={()=>{
                this.props.setListModal({
                  title: "Edit List(s)",
                  description: "Choose a list or mulitple lists to add "+this.props.active_property.property_address+".",
                  type: "edit_lists_for_lead",
                  selected_leads:[this.props.active_property],
                  selected_lists: this.props.active_property.deal.lists,
                  modalAction: ({selected_leads, selected_lists})=>{
                    //trigger add to list
                    this.props.updateLead({
                      token: this.props.token,
                      type: "edit_lists_for_lead",
                      list_ids: selected_lists.map((list)=>{
                        return list.id
                      }).join(),
                      deal_ids: selected_leads.map((property)=>{
                          return property.deal.id;
                      }).join(),
                      onSuccess:()=>{
                        this.updateTempLists()
                      }
                    })
                  },

                  cancelAction:()=>{
                    this.updateTempLists()
                  },
                  fieldsUpdated:(fields)=>{
                    this.updateTempLists(fields)
                  },
                  popoverTarget: !this.props.isMobile ? this._lists_button.current : null,
                  popoverPlacement: "left"
                });
              this.props.appRedirect({redirect: "goForward", payload: {add: "lists"}})
              }}
            />
          </Wrapper>
        )
      }
    }

    return <Wrapper />
  }

}



export default Lists;
