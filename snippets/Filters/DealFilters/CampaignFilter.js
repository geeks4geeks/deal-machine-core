import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';
import {
  getCampaigns,
  setItemSelectorModal,
  appRedirect
} from 'app/NativeActions';


class CampaignFilters extends Component {

  constructor(props){

    super(props);

    this.state = {
      formatted_items: [],
      selected_items: [],
      campaign_ids: null,
      filter_title: "Campagins",
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

    for(let i = 0; i<this.props.campaigns.length; i++){
      formatted_array.push({
        value: this.props.campaigns[i].id,
        label: this.props.campaigns[i].title
      });
    }

    this.setState({
      formatted_items: formatted_array
    })
  }

  componentDidMount() {
    this.checkFilterSearch();

    this.formatArray();
    if(this.props.campaigns.length === 0){
      this.getItems();
    }
    this.updateSelectedItems(this.props.filters.campaign_ids);
  }

  componentDidUpdate(prevProps){
    if(prevProps.filter_search !== this.props.filter_search){
      this.checkFilterSearch();
    }

    if(prevProps.campaigns !== this.props.campaigns){
      this.formatArray()
    }

    if(prevProps.filters.campaign_ids !== this.props.filters.campaign_ids){
      this.updateSelectedItems(this.props.filters.campaign_ids);
    }
  }

  getItems(){
    if(!this.props.campaign_loading){
      this.props.getCampaigns({ token: this.props.token, type: "load" });
    }
  }

  getLabelFromItem(id){
    for(let i = 0; i<this.props.campaigns.length; i++){
      if(this.props.campaigns[i].id === id){
        return this.props.campaigns[i].title;
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
    if(this.state.show_filter && (this.props.filters.mail_template_ids === null || this.props.filters.mail_template_ids === "")){

      if(this.props.campaigns.length > 0){
        return (
          <MenuItem
            onPress={()=>{
              this.props.setItemSelectorModal({
                title: "Select Options",
                description: "Select a campaign or multiple campaigns to filter your leads.",
                items: this.state.formatted_items,
                selected_items: this.state.selected_items,
                item_limit: 0,
                modalAction:({selected_items})=>{
                  this.props.editLeadFilter({
                    prop: "campaign_ids",
                    value: selected_items.map((item)=>{
                      return item.value
                    }).join(",")
                  })
                  this.props.appRedirect({redirect: "goBack", payload: {remove: "select-campaigns"}})
                },
                slug: "select-campaigns"
              })
              this.props.appRedirect({redirect: "goForward", payload: {add: "select-campaigns"}})
            }}
            title="Campaigns"
            text={this.renderSelectedItemText()}
            hasBorder={true}
          />
        )
      }
      /*
      if(this.props.campaign_loading){
        return (
          <Wrapper style={{
            padding: 20
          }}>
            <Row>
              <Spin size="small"/>
              <Copy style={{marginLeft: 10}}>Loading Campaigns...</Copy>
            </Row>
          </Wrapper>
        )
      }
      */
    }

    return (
      <Wrapper />
    );
  }

}

const mapStateToProps = ({ auth, native, campaign }) => {
  const { token, user } = auth;
  const { campaigns, campaign_loading } = campaign;

  return {
    token,
    user,
    campaigns,
    campaign_loading
  };
}


export default connect(mapStateToProps, {
  getCampaigns,
  setItemSelectorModal,
  appRedirect
})(CampaignFilters);
