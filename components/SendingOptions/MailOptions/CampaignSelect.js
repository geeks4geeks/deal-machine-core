import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

class CampaignSelect extends Component{

  constructor(props) {

    super(props);



    this.state = {campaign_array: []}
  }

  setCampaigns(){
    var campaign_array = [];
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

    this.setState({
      campaign_array: campaign_array
    })
  }

  componentDidMount(){
    if(this.props.campaigns.length == 0){
      this.props.getCampaigns({ token: this.props.token, type: "load" });
    }else{
      this.setCampaigns();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.templates != this.props.templates){
      this.setCampaigns();
    }
  }


  render(){

    if(this.props.campaigns.length > 0 && !this.props.onboarding){
      return (
        <Card>
          <Select
            item_ref={"select_campaign"}
            items={this.state.campaign_array}
            title={this.props.select_default_sending_options ? "My default campaign" : "Select a campaign:"}
            label="Select a campaign"
            value={this.props.select_default_sending_options ? this.props.editUser.default_campaign_id : this.props.editHouse.campaign_id}
            text={this.props.select_default_sending_options ? this.props.editUser.default_campaign_id == 0 ? "No Campaign" : this.props.editUser.default_campaign_title : this.props.editHouse.campaign_title}
            onSelect={item => {
              var campaign_title;
              for(var i = 0; i<this.props.campaigns.length; i++){
                if(item == this.props.campaigns[i].id){
                  campaign_title = this.props.campaigns[i].title;
                }
              }
              if(this.props.select_default_sending_options){
                this.props.updateUserFieldChange({prop: "default_campaign_id", value: item});
                this.props.updateUserFieldChange({prop: "default_campaign_title", value: campaign_title});
              }else{
                this.props.editHouseFieldChange({prop: "campaign_id", value: item});
                this.props.editHouseFieldChange({prop: "campaign_title", value: campaign_title});
              }
            }}
          />
        </Card>
      );
    }

    return <Wrapper />
  }

}

export default CampaignSelect;
