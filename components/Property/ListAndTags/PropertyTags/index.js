import React, { Component } from 'react';

import {
  Wrapper
} from 'app/NativeComponents/common';

import {
  MenuItem
} from 'app/NativeComponents/snippets';

class PropertyTags extends Component{

  constructor(props){
    super(props);
    this._tags_button = React.createRef();

    this.state = {
      tags: props.active_property.deal ? props.active_property.deal.tags : [],
      temp_tags: null
    }

  }

  componentDidUpdate(prevProps){
    if(this.props.active_property !== prevProps.active_property){
      this.setState({tags: this.props.active_property.deal ? this.props.active_property.deal.tags : []})
    }
  }

  updateTempTags(item = null){

    this.setState({
      temp_tags: item
    })
  }


  renderNoTags(){
    if(this.state.tags.length == 0 && this.state.temp_tags == null){
      return "N/A";
    }
  }

  render(){
    if(this.props.active_property.deal){
      if(parseInt(this.props.active_property.deal.creator_id) === parseInt(this.props.user.id) || this.props.user.team_clearance_level > 0){
        return (

          <Wrapper
          wrapper_ref={this._tags_button}
          style={{
            borderBottomColor: this.props.colors.border_color,
            borderBottomWidth: 1,
            borderBottomStyle: "solid"
          }}>
            <MenuItem
              title={"Tag(s):"}
              text= {this.state.temp_tags === null && this.state.tags.length > 0 ? this.state.tags.map((tag, i)=>{
                return i == (this.state.tags.length - 1) ? tag.title : tag.title+", ";
              }) : this.state.temp_tags !== null ? this.state.temp_tags.map((tag, i)=>{
                return i == (this.state.temp_tags.length - 1) ? tag.title : tag.title+", ";
              }) : this.renderNoTags()}
              onPress={()=>{
                this.props.setTagModal({
                  title: "Edit Tag(s)",
                  description: "Choose a tag or mulitple tags to add "+this.props.active_property.property_address+".",
                  type: "edit_tags_for_lead",
                  selected_leads:[this.props.active_property],
                  selected_tags: this.state.tags,
                  modalAction: ({selected_leads, selected_tags})=>{
                    //trigger add to list
                    this.props.updateLead({
                      token: this.props.token,
                      type: "edit_tags_for_lead",
                      tag_ids: selected_tags.map((tag)=>{
                        return tag.id
                      }).join(),
                      deal_ids: this.props.active_property.deal.id,
                      onSuccess:()=>{
                        this.updateTempTags();
                      }
                    })
                  },
                  cancelAction:()=>{
                    this.updateTempTags()
                  },
                  fieldsUpdated:(fields)=>{
                    this.updateTempTags(fields)
                  },
                  popoverTarget: !this.props.isMobile ? this._tags_button.current : null,
                  popoverPlacement: "left"

                });

                this.props.appRedirect({redirect: "goForward", payload: {add: "tags"}})
              }}
            />
          </Wrapper>
        )
      }
    }

    return <Wrapper />
  }

}



export default PropertyTags;
