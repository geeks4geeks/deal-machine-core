import React, { Component } from 'react';
import {Card} from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';


class CampaignItem extends Component{


  render(){
    return (
        <Card>
          <MenuItem
            to={"/app/campaigns/edit/"+this.props.campaign.id}
            onPress={this.props.onPress}
            title={this.props.campaign.title}
            text={this.props.campaign.description}
          />
        </Card>
    )
  }

}

export default CampaignItem;
