import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, SecondaryButton } from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';

import CampaignItem from './CampaignItem';

class CampaignList extends Component{


  render(){

    return (
      <Wrapper style={{flex: 1}}>
        <List
          rowNumber={1}
          style={{flex: 1}}
          items={this.props.campaigns}
          infiniteScroll={false}
          itemStruture={({item}) => {
            return <CampaignItem
                    key={item.id}
                    campaign={item}
                    onPress={()=>{
                      //SET Template
                      this.props.campaignInit({campaign: item});
                      this.props.appRedirect({redirect: "editCampaign", payload:{id: item.id}});
                    }}
                   />
          }}
          canRefresh={true}
          onRefresh={()=>{
            this.props.getCampaigns({ token: this.props.token, type: "refresh" });
          }}
          is_refreshing={this.props.refreshing}
          canLoadMore={false}
          listFooter={()=>{
            return (
              <Wrapper>
                <Card>
                  <PrimaryButton onPress={()=>{
                    //set template blank
                    this.props.newCampaign();
                  }}>
                    Create New Campaign
                  </PrimaryButton>
                </Card>
              
              </Wrapper>
            )
          }}
        />
      </Wrapper>
    );
  }

}

export default CampaignList;
