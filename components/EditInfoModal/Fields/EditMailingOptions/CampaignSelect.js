import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  getCampaigns
} from 'app/NativeActions';


class CampaignSelect extends Component{

  constructor(props) {

    super(props);
    this.state = {campaign_array: []}
  }

  setCampaigns(){
    let campaign_array = [];
    campaign_array.push({
      key: -1,
      value: 0,
      label: "No Campaign"
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

  componentDidMount(){
    this.setCampaigns();

    if(this.props.campaigns.length === 0){
      //get campaigns
      this.props.getCampaigns({ token: this.props.token, type: "load" });
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.campaigns !== prevProps.campaigns){
      this.setCampaigns();
    }
  }

  render(){

    if(this.props.campaigns.length > 0){

      return (
        <Card>
          <Select
            item_ref={"select_campaign"}
            items={this.state.campaign_array}
            title={this.props.select_default_sending_options ? "My default campaign" : "Select a campaign:"}
            label="Select a campaign"
            value={this.props.fields.campaign_id}
            text={parseInt(this.props.fields.campaign_id) === 0 ? "No Campaign" : this.props.fields.campaign_title}
            onSelect={item => {

              var campaign_title;
              for(var i = 0; i<this.props.campaigns.length; i++){
                if(parseInt(item) === parseInt(this.props.campaigns[i].id)){
                  campaign_title = this.props.campaigns[i].title;
                }
              }

              this.props.updateField({prop: "campaign_id", value: item});
              this.props.updateField({prop: "campaign_title", value: campaign_title});
            }}
          />
        </Card>
      );
    }

    return <Wrapper />
  }

}


const mapStateToProps = ({ campaign }) => {


  const { campaigns } = campaign;

  return {
    campaigns
  }
}



export default connect(mapStateToProps, {
  getCampaigns
})(CampaignSelect);
