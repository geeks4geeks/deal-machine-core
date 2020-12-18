import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Wrapper, Row, Spin, Copy } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  getCampaigns
} from 'app/NativeActions';


class CampaignFilter extends Component{

  constructor(props) {

    super(props);

    this.state = {campaign_array: []}

  }

  formatArray(){
    var campaign_array = [];

    //add default
    campaign_array.push({
      key: -1,
      value: "none",
      label: "N/A"
    });

    for(var i = 0; i<this.props.campaigns.length; i++){
      campaign_array.push({
        key: i,
        value: this.props.campaigns[i].id,
        label: this.props.campaigns[i].title
      });
    }


    this.setState({campaign_array: campaign_array})
  }

  getItems(){
    if(!this.props.campaign_loading){
      this.props.getCampaigns({ token: this.props.token, type: "load" });
    }
  }

  componentDidMount(){
    this.formatArray();
    if(this.props.campaigns.length === 0){
      this.getItems();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.campaigns !== this.props.campaigns){
      this.formatArray()
    }
  }

  renderTitle(campaign){
    var campaign_title = "";
    for(var i = 0; i<this.state.campaign_array.length; i++){
      if(campaign == this.state.campaign_array[i].value){
        campaign_title = this.state.campaign_array[i].label;
      }
    }
    return campaign_title;
  }

  render(){
    if(this.props.analytics_type == "all"){
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

    if(this.props.filters.template == "none" ||
        this.props.filters.template == null ||
        this.props.filters.template == 0 ||
        this.props.filters.template == ""
      ){
          return(
              <Select
                item_ref={"select_campaign"}
                items={this.state.campaign_array}
                title="Filter By Campaign:"
                label="Select a campaign"
                value={this.props.filters.campaign}
                text={this.props.filters.campaign_title}
                onSelect={item => {
                  this.props.updateFilter({prop: "campaign", value: item});
                  this.props.updateFilter({prop: "campaign_title", value: this.renderTitle(item)});
                  //update campaign filter
                  if(item != 0 && item != "none"){
                    this.props.updateFilter({prop: "template", value: "none"});
                    this.props.updateFilter({prop: "template_title", value: "All Templates"});
                  }

                }}
              />
            );
        }
    }

      return <Wrapper />
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
  getCampaigns
})(CampaignFilter);
